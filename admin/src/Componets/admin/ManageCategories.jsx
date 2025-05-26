"use client"

import React, { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { allCategoriesAtom } from "../../Atoms/categories"
import { backendUrl } from "../../globle"
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  IconButton, 
  Chip,
  Paper, 
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Collapse,
  Tooltip
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import SaveIcon from "@mui/icons-material/Save"
import CloseIcon from "@mui/icons-material/Close"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import { fetchCategories } from "../../backend/init"

const API_BASE = `${backendUrl}/categories`

const ManageCategories = () => {
  // Use Recoil for categories
  const [categories, setCategories] = useRecoilState(allCategoriesAtom)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState("category") // "category" or "subcategory"
  const [dialogMode, setDialogMode] = useState("add") // "add" or "edit"
  const [categoryName, setCategoryName] = useState("")
  const [subcategoryName, setSubcategoryName] = useState("")
  const [parentCategory, setParentCategory] = useState(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [alert, setAlert] = useState({ show: false, type: "success", message: "" })
  const [isDragging, setIsDragging] = useState(false)
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverItem, setDragOverItem] = useState(null)

  // Fetch categories from backend

  useEffect(() => {
    fetchCategories(setCategories, API_BASE)
    // eslint-disable-next-line
  }, [])

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message })
    setTimeout(() => {
      setAlert({ ...alert, show: false })
    }, 3000)
  }

  const handleOpenDialog = (type, mode, category = null, subcategory = null) => {
    setDialogType(type)
    setDialogMode(mode)
    if (type === "category") {
      if (mode === "edit" && category) {
        setCategoryName(category.name)
        setSelectedCategory(category)
      } else {
        setCategoryName("")
        setSelectedCategory(null)
      }
    } else {
      setParentCategory(category)
      if (mode === "edit" && subcategory) {
        setSubcategoryName(subcategory.name)
        setSelectedSubcategory(subcategory)
      } else {
        setSubcategoryName("")
        setParentCategory(category)
        setSelectedSubcategory(null)
      }
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setCategoryName("")
    setSubcategoryName("")
    setParentCategory(null)
    setSelectedCategory(null)
    setSelectedSubcategory(null)
  }

  // Add category
  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      showAlert("error", "Category name cannot be empty")
      return
    }
    try {
      await axios.post(API_BASE, { name: categoryName })
      showAlert("success", `Category "${categoryName}" added successfully`)
      setOpenDialog(false)
      setCategoryName("")
      fetchCategories()
    } catch {
      showAlert("error", "Failed to add category")
    }
  }

  // Delete category
  const handleDeleteCategory = async (category) => {
    if (!window.confirm(`Are you sure you want to delete "${category.name}" and all its subcategories?`)) return
    try {
      await axios.delete(`${API_BASE}/${category.id}`)
      showAlert("success", `Category "${category.name}" deleted successfully`)
      fetchCategories()
    } catch {
      showAlert("error", "Failed to delete category")
    }
  }

  // Add subcategory
  const handleAddSubcategory = async () => {
    if (!subcategoryName.trim() || !parentCategory) {
      showAlert("error", "Subcategory name cannot be empty")
      return
    }
    try {
      await axios.post(`${API_BASE}/${parentCategory.id}/subcategory`, {
        subCategory: subcategoryName,
      })
      showAlert("success", `Subcategory "${subcategoryName}" added successfully`)
      setOpenDialog(false)
      setSubcategoryName("")
      fetchCategories()
    } catch {
      showAlert("error", "Failed to add subcategory")
    }
  }

  // Delete subcategory
  const handleDeleteSubcategory = async (category, subcategory) => {
    if (!window.confirm(`Are you sure you want to delete "${subcategory.name}"?`)) return
    try {
      await axios.delete(`${API_BASE}/${category.id}/subcategory`, {
        data: { subCategory: subcategory.name },
      })
      showAlert("success", `Subcategory "${subcategory.name}" deleted successfully`)
      fetchCategories()
    } catch {
      showAlert("error", "Failed to delete subcategory")
    }
  }

  const handleToggleExpand = (categoryId) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId ? { ...cat, expanded: !cat.expanded } : cat
    ))
  }

  const handleExportToJson = () => {
    // Create a blob of the data
    const fileData = JSON.stringify(categories, null, 2)
    const blob = new Blob([fileData], { type: "application/json" })
    
    // Create a link and trigger the download
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = "product-categories.json"
    link.href = url
    link.click()
    
    showAlert("success", "Categories exported to JSON file")
  }

  const handleDragStart = (e, item, type, parentId = null) => {
    setIsDragging(true)
    setDraggedItem({ item, type, parentId })
  }

  const handleDragOver = (e, item, type, parentId = null) => {
    e.preventDefault()
    if (!draggedItem) return

    // Don't allow dropping a category into itself
    if (draggedItem.type === "category" && type === "subcategory") return
    if (draggedItem.type === "category" && draggedItem.item.id === item.id) return
    
    // Don't allow dropping a subcategory into its own parent category
    if (draggedItem.type === "subcategory" && type === "category" && 
        draggedItem.parentId === item.id) return

    setDragOverItem({ item, type, parentId })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (!draggedItem || !dragOverItem) return
    
    const { item: dragItem, type: dragType, parentId: dragParentId } = draggedItem
    const { item: dropItem, type: dropType, parentId: dropParentId } = dragOverItem
    
    let newCategories = [...categories]
    
    // Dragging category to reorder
    if (dragType === "category" && dropType === "category") {
      const dragIndex = newCategories.findIndex(cat => cat.id === dragItem.id)
      const dropIndex = newCategories.findIndex(cat => cat.id === dropItem.id)
      
      const [removed] = newCategories.splice(dragIndex, 1)
      newCategories.splice(dropIndex, 0, removed)
    }
    
    // Dragging subcategory to reorder within same parent
    else if (dragType === "subcategory" && dropType === "subcategory" && dragParentId === dropParentId) {
      const parent = newCategories.find(cat => cat.id === dragParentId)
      if (!parent) return
      
      const dragIndex = parent.subcategories.findIndex(subcat => subcat.id === dragItem.id)
      const dropIndex = parent.subcategories.findIndex(subcat => subcat.id === dropItem.id)
      
      const newSubcategories = [...parent.subcategories]
      const [removed] = newSubcategories.splice(dragIndex, 1)
      newSubcategories.splice(dropIndex, 0, removed)
      
      newCategories = newCategories.map(cat => 
        cat.id === parent.id ? { ...cat, subcategories: newSubcategories } : cat
      )
    }
    
    // Dragging subcategory to another parent category
    else if (dragType === "subcategory" && dropType === "category") {
      // Find source parent and remove subcategory
      const sourceParent = newCategories.find(cat => cat.id === dragParentId)
      if (!sourceParent) return
      
      const subcategoryToMove = sourceParent.subcategories.find(subcat => subcat.id === dragItem.id)
      if (!subcategoryToMove) return
      
      // Update path to reflect new parent
      const targetParent = newCategories.find(cat => cat.id === dropItem.id)
      if (!targetParent) return
      
      // Create a copy with updated path
      const updatedSubcategory = {
        ...subcategoryToMove,
        path: `${targetParent.path}/${createSlug(subcategoryToMove.name)}`
      }
      
      // Remove from source parent
      newCategories = newCategories.map(cat => {
        if (cat.id === sourceParent.id) {
          return {
            ...cat,
            subcategories: cat.subcategories.filter(subcat => subcat.id !== dragItem.id)
          }
        }
        return cat
      })
      
      // Add to target parent
      newCategories = newCategories.map(cat => {
        if (cat.id === targetParent.id) {
          return {
            ...cat,
            subcategories: [...cat.subcategories, updatedSubcategory],
            expanded: true
          }
        }
        return cat
      })
    }
    
    setCategories(newCategories)
    setDraggedItem(null)
    setDragOverItem(null)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setDraggedItem(null)
    setDragOverItem(null)
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {alert.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Alert 
              severity={alert.type}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setAlert({ ...alert, show: false })}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {alert.message}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Box className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <Typography variant="h5" component="h2" className="font-bold text-gray-800">
          Product Categories Management
        </Typography>
        
        <Box className="flex gap-2">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog("category", "add")}
            className="bg-gradient-to-r from-blue-500 to-blue-700"
          >
            Add Category
          </Button>
          
          <Button
            variant="outlined"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleExportToJson}
          >
            Export Categories
          </Button>
        </Box>
      </Box>
      
      <Box className="space-y-4">
        <Typography variant="subtitle1" className="text-gray-600 mb-2">
          Drag and drop categories or subcategories to reorder them. You can also drag subcategories between categories.
        </Typography>
        
        {categories.length === 0 ? (
          <Paper className="p-6 text-center bg-white/80">
            <Typography variant="body1" color="textSecondary">
              No categories yet. Add your first category to get started.
            </Typography>
          </Paper>
        ) : (
          categories.map((category) => (
            <Paper
              key={category.id}
              className={`overflow-hidden border transition-all duration-200 
                ${isDragging && dragOverItem?.item?.id === category.id && dragOverItem?.type === 'category' 
                  ? 'border-blue-500 border-2' 
                  : 'border-gray-200'}`}
              draggable
              onDragStart={(e) => handleDragStart(e, category, "category")}
              onDragOver={(e) => handleDragOver(e, category, "category")}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
            >
              <Box className="bg-white/80 p-4 flex items-center justify-between">
                <Box className="flex items-center gap-3">
                  <Typography variant="h6" className="font-medium">
                    {category.name}
                  </Typography>
                  <Chip 
                    label={category.path} 
                    size="small"
                    variant="outlined"
                    className="text-xs bg-gray-50"
                  />
                </Box>
                
                <Box className="flex items-center gap-2">
                  <Tooltip title="Add Subcategory">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenDialog("subcategory", "add", category)}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Category">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteCategory(category)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {category.subcategories.length > 0 && (
                    <Tooltip title={category.expanded ? "Collapse" : "Expand"}>
                      <IconButton
                        size="small"
                        onClick={() => handleToggleExpand(category.id)}
                      >
                        {category.expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Box>
              
              {category.subcategories.length > 0 && (
                <Collapse in={category.expanded}>
                  <Box className="bg-gray-50 p-2">
                    <Typography variant="subtitle2" className="text-gray-600 ml-4 my-2">
                      Subcategories
                    </Typography>
                    
                    <Grid container spacing={2} className="px-2">
                      {category.subcategories.map((subcategory) => (
                        <Grid item xs={12} sm={6} md={4} key={subcategory.id}>
                          <Paper
                            className={`p-3 bg-white border transition-all duration-200
                              ${isDragging && dragOverItem?.item?.id === subcategory.id && dragOverItem?.type === 'subcategory'
                                ? 'border-blue-500 border-2' 
                                : 'border-gray-100'}`}
                            draggable
                            onDragStart={(e) => handleDragStart(e, subcategory, "subcategory", category.id)}
                            onDragOver={(e) => handleDragOver(e, subcategory, "subcategory", category.id)}
                            onDrop={handleDrop}
                            onDragEnd={handleDragEnd}
                          >
                            <Box className="flex items-center justify-between">
                              <Box>
                                <Typography variant="body2" className="font-medium">
                                  {subcategory.name}
                                </Typography>
                                <Typography variant="caption" color="textSecondary" className="block text-xs truncate" style={{ maxWidth: "160px" }}>
                                  {subcategory.path}
                                </Typography>
                              </Box>
                              
                              <Box className="flex">
                                <Tooltip title="Delete Subcategory">
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleDeleteSubcategory(category, subcategory)}
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Collapse>
              )}
            </Paper>
          ))
        )}
      </Box>

      {/* Dialog for adding categories and subcategories only */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="bg-gray-50">
          {dialogType === "category" 
            ? "Add New Category"
            : "Add New Subcategory"}
        </DialogTitle>
        <DialogContent className="pt-4">
          {dialogType === "category" ? (
            <TextField
              autoFocus
              margin="dense"
              label="Category Name"
              type="text"
              fullWidth
              variant="outlined"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="mb-4"
            />
          ) : (
            <>
              {parentCategory && (
                <Typography variant="subtitle2" className="mb-3 text-gray-600">
                  Parent Category: <strong>{parentCategory.name}</strong>
                </Typography>
              )}
              <TextField
                autoFocus
                margin="dense"
                label="Subcategory Name"
                type="text"
                fullWidth
                variant="outlined"
                value={subcategoryName}
                onChange={(e) => setSubcategoryName(e.target.value)}
                className="mb-4"
              />
            </>
          )}
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={
              dialogType === "category"
                ? handleAddCategory
                : handleAddSubcategory
            }
            variant="contained" 
            color="primary"
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ManageCategories