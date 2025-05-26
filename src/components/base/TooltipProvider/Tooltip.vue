<script lang="ts">
import { isFunction } from 'es-toolkit'
import { defineComponent, h, ref } from 'vue'
import { useTooltipContext } from './composable'

export default defineComponent({
  name: 'Tooltip',
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    const context = useTooltipContext()
    const slotRef = ref<HTMLElement | null>(null)

    function handleMouseEnter() {
      context.visible.value = true
      context.content.value = props.content
      context.virtualRef.value = slotRef.value
    }

    function handleMouseLeave() {
      context.visible.value = false
      context.content.value = undefined
      context.virtualRef.value = undefined
    }

    return () => {
      const slotContent = slots.default?.()
      if (!slotContent || slotContent.length === 0)
        return null

      const vnode = slotContent[0]
      if (!vnode)
        return null

      return h(vnode, {
        ...vnode.props,
        ref: (el: any) => {
          slotRef.value = el
          if (isFunction(vnode.ref)) {
            vnode.ref(el)
          }
          else if (vnode.ref) {
            (vnode.ref as any).value = el
          }
        },
        onMouseenter: (e: Event) => {
          handleMouseEnter()
          vnode.props?.onMouseenter?.(e)
        },
        onMouseleave: (e: Event) => {
          handleMouseLeave()
          vnode.props?.onMouseleave?.(e)
        },
      })
    }
  },
})
</script>
