// 导入React钩子函数
import { useRef } from "react"
// 导入Framer Motion动画库相关组件和钩子
import {
  AnimatePresence,
  motion,
  useInView,
  UseInViewOptions,
  Variants,
} from "framer-motion"

// 边距类型定义，用于视口检测
type MarginType = UseInViewOptions["margin"]

/**
 * 模糊淡入组件的属性接口
 */
interface BlurFadeProps {
  children: React.ReactNode    // 子组件内容
  className?: string          // 自定义CSS类名
  variant?: {                 // 自定义动画变体
    hidden: { y: number }     // 隐藏状态的Y轴偏移
    visible: { y: number }    // 可见状态的Y轴偏移
  }
  duration?: number           // 动画持续时间（秒）
  delay?: number              // 动画延迟时间（秒）
  yOffset?: number            // Y轴偏移量（像素）
  inView?: boolean            // 是否启用视口检测
  inViewMargin?: MarginType   // 视口检测边距
  blur?: string               // 模糊效果强度
}

/**
 * 模糊淡入组件
 * 提供带有模糊效果的淡入动画，支持视口检测触发
 * 当元素进入视口时，从模糊状态淡入到清晰状态
 * 
 * @param children - 要应用动画的子元素
 * @param className - 自定义CSS类名
 * @param variant - 自定义动画变体，覆盖默认动画
 * @param duration - 动画持续时间，默认0.4秒
 * @param delay - 动画延迟时间，默认0秒
 * @param yOffset - Y轴偏移量，默认6像素
 * @param inView - 是否启用视口检测，默认false
 * @param inViewMargin - 视口检测边距，默认"-50px"
 * @param blur - 模糊效果强度，默认"6px"
 */
export function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps) {
  // 组件DOM元素引用
  const ref = useRef(null)
  // 检测元素是否在视口中，只触发一次
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin })
  // 判断是否应该显示动画（不启用视口检测或元素已在视口中）
  const isInView = !inView || inViewResult
  
  // 默认动画变体：从模糊+偏移状态到清晰+居中状态
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },    // 隐藏状态：向下偏移、透明、模糊
    visible: { y: -yOffset, opacity: 1, filter: `blur(0px)` },      // 可见状态：向上偏移、不透明、清晰
  }
  
  // 使用自定义变体或默认变体
  const combinedVariants = variant || defaultVariants
  
  return (
    <AnimatePresence>
      <motion.div
        ref={ref}                                    // 绑定DOM引用
        initial="hidden"                             // 初始状态为隐藏
        animate={isInView ? "visible" : "hidden"}    // 根据视口状态切换动画
        exit="hidden"                                // 退出时回到隐藏状态
        variants={combinedVariants}                  // 应用动画变体
        transition={{
          delay: 0.04 + delay,                       // 基础延迟0.04秒 + 自定义延迟
          duration,                                  // 动画持续时间
          ease: "easeOut",                          // 缓动函数：先快后慢
        }}
        className={className}                        // 应用自定义CSS类
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}