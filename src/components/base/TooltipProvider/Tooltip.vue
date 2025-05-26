<script setup lang="ts">
import { h, ref } from 'vue';
import { useTooltipContext } from './composable'

const props = defineProps<{content: string}>()

const slots = defineSlots()

const componentRef = ref<any>()

const context = useTooltipContext()

const SlotComponent = (props: any) => h(slots.default?.()[0], { ref: componentRef, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, ...props})

function handleMouseEnter() {    
  context.visible.value = true
  context.content.value = props.content
  context.virtualRef.value = componentRef.value
}

function handleMouseLeave() {
  context.visible.value = false
  context.content.value = undefined
  context.virtualRef.value = undefined
}

</script>

<template>
  <SlotComponent @mouseenter.stop="handleMouseEnter" @mouseleave.stop="handleMouseLeave" />
</template>