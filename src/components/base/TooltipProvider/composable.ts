import type { Ref, VNode } from 'vue'
import { inject } from 'vue'

export const TooltipInjectionKey = Symbol()

export interface TooltipContext {
  visible: Ref<boolean>
  virtualRef: Ref<any>
  content: Ref<string | VNode | undefined>
}

export function useTooltipContext() {
  return inject(TooltipInjectionKey) as TooltipContext
}