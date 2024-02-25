import { BREAKPOINTS } from '@/utils/responsive'
import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useResponsive() {
  const isMobile = ref(false)
  const isTabletAndUp = ref(false)
  const isDesktopAndUp = ref(false)
  const isDesktopLargeAndUp = ref(false)

  const handleResize = () => {
    const windowWidth = window.innerWidth

    isMobile.value = windowWidth < BREAKPOINTS.TABLET_MIN
    isTabletAndUp.value = windowWidth >= BREAKPOINTS.TABLET_MIN
    isDesktopAndUp.value = windowWidth >= BREAKPOINTS.DESKTOP_MIN
    isDesktopLargeAndUp.value = windowWidth >= BREAKPOINTS.DESKTOP_LARGE_MIN
  }

  onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    isMobile,
    isTabletAndUp,
    isDesktopAndUp,
    isDesktopLargeAndUp
  }
}
