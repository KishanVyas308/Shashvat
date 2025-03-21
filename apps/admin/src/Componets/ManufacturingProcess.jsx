import React from "react";
import { motion } from "framer-motion"; // For animations

const processSteps = [
  {
    id: 1,
    title: "Raw Material Sourcing",
    description:
      "We source the highest quality raw brass materials from trusted suppliers.",
    icon: "🧱",
  },
  {
    id: 2,
    title: "Melting and Casting",
    description:
      "The raw brass is melted at high temperatures and cast into molds.",
    icon: "🔥",
  },
  {
    id: 3,
    title: "Precision Machining",
    description:
      "Our state-of-the-art machines shape the brass into precise components.",
    icon: "⚙",
  },
  {
    id: 4,
    title: "Quality Inspection",
    description:
      "Each product undergoes rigorous quality checks to ensure perfection.",
    icon: "📋",
  },
  {
    id: 5,
    title: "Packaging & Delivery",
    description:
      "Finished products are carefully packaged and delivered to clients.",
    icon: "📦",
  },
];

const ManufacturingProcess = () => {
  return (
    <>
      <section className="manufacturing-process">
        <div className="container">
          <h2 className="section-title">Our Manufacturing Process</h2>
          <div className="timeline">
            {processSteps.map((step, index) => (
              <motion.div
                className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="timeline-icon">{step.icon}</div>
                <div className="timeline-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Basic Container Styling */
        .manufacturing-process {
          background-color: #f5f5f5;
          padding: 50px 0;
          font-family: 'Arial', sans-serif;
        }

        .container {
          width: 80%;
          margin: 0 auto;
        }

        .section-title {
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 40px;
          color: #333;
        }

        /* Timeline Layout */
        .timeline {
          display: flex;
          flex-direction: column;
          gap: 50px;
        }

        .timeline-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          padding-left: 50px;
          transition: transform 0.3s ease-in-out;
        }

        .timeline-item.left {
          align-items: flex-start;
        }

        .timeline-item.right {
          align-items: flex-end;
          padding-right: 50px;
        }

        .timeline-icon {
          font-size: 3rem;
          background-color: #009688;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          left: -25px;
        }

        .timeline-content {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 500px;
        }

        .timeline-item h3 {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
        }

        .timeline-item p {
          font-size: 1rem;
          color: #777;
        }

        /* Responsiveness */
        @media screen and (max-width: 768px) {
          .timeline {
            gap: 30px;
          }

          .timeline-item {
            padding-left: 20px;
            padding-right: 20px;
          }

          .timeline-icon {
            left: 0;
            margin-bottom: 15px;
          }

          .timeline-item.left {
            align-items: center;
          }

          .timeline-item.right {
            align-items: center;
          }
        }

        @media screen and (max-width: 480px) {
          .section-title {
            font-size: 1.5rem;
          }

          .timeline-item h3 {
            font-size: 1.25rem;
          }

          .timeline-item p {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
};

export default ManufacturingProcess;
