"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CreateProduct from "../../Componets/admin/CreateProduct"
import UpdateProduct from "../../Componets/admin/UpdateProduct"
import DeleteProduct from "../../Componets/admin/DeleteProduct"

const ManageProducts = () => {
  const [selectedTab, setSelectedTab] = useState("create")
  const [isLoading, setIsLoading] = useState(true)

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    scrollToTop()
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const tabs = [
    {
      id: "create",
      label: "Create",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, type: "spring" }}
          />
        </svg>
      ),
    },
    {
      id: "update",
      label: "Update",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, type: "spring" }}
          />
        </svg>
      ),
    },
    {
      id: "delete",
      label: "Delete",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, type: "spring" }}
          />
        </svg>
      ),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl"></div>
            <h1 className="relative text-4xl font-bold text-gray-900 tracking-tight">Manage Products</h1>
          </div>
        </motion.div>

        <div className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl border border-white/20 p-2 inline-flex mb-6">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`
                relative px-6 py-3 rounded-xl font-medium text-sm
                transition-all duration-300 ease-out
                flex items-center gap-2
                ${selectedTab === tab.id ? "text-white bg-gradient-to-r from-blue-500 to-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"}
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{tab.icon}</span>
              <span className="relative z-10">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        <motion.div layout className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl border border-white/20 p-8">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-1/4"></div>
                <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse w-1/2"></div>
              </motion.div>
            ) : (
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl blur-2xl"></div>
                  <div className="relative">
                    {selectedTab === "create" && <CreateProduct />}
                    {selectedTab === "update" && <UpdateProduct />}
                    {selectedTab === "delete" && <DeleteProduct />}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ManageProducts