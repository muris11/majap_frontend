 "use client";
 
 import { motion, MotionProps } from "framer-motion";
 import { cn } from "@/lib/utils";
 
 interface FadeInProps extends MotionProps {
   children: React.ReactNode;
   delay?: number;
   className?: string;
  direction?: "up" | "down" | "left" | "right";
  fullWidth?: boolean;
 }
 
export function FadeIn({ children, delay = 0, direction = "up", fullWidth = false, className, ...props }: FadeInProps) {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
    }
  };

   return (
     <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
       transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(fullWidth ? "w-full" : "", className)}
       {...props}
     >
       {children}
     </motion.div>
   );
 }

export function ScaleIn({ children, delay = 0, className, ...props }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 100 }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
 
export function SlideIn({ children, delay = 0, direction = "left", className, ...props }: FadeInProps) {
  const variants = {
    hidden: { 
      opacity: 0, 
      x: direction === "left" ? -100 : 100 
    },
    visible: { 
      opacity: 1, 
      x: 0 
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

 export function FadeInStagger({ children, className, ...props }: MotionProps & { className?: string }) {
   return (
     <motion.div
       initial="hidden"
       whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ staggerChildren: 0.15 }}
       className={cn(className)}
       {...props}
     >
       {children}
     </motion.div>
   );
 }
 
 FadeInStagger.Item = function FadeInStaggerItem({ children, className, ...props }: MotionProps & { className?: string }) {
   return (
     <motion.div
       variants={{
        hidden: { opacity: 0, y: 30 },
         visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
       }}
       className={cn(className)}
       {...props}
     >
       {children}
     </motion.div>
   );
 };
