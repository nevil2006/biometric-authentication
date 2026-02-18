import { motion } from "framer-motion";

function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        textAlign: "center",
        color: "white"
      }}
    >
      <h1>✅ Authentication Granted</h1>
      <p>Welcome to your secure biometric system</p>
    </motion.div>
  );
}

export default Dashboard;
