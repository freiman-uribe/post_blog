<script setup lang="ts">
import type { buttonProps } from '@/types/componets.type';

interface Emits {
    (e: 'click', event: MouseEvent): void;
}

const props = withDefaults(defineProps<buttonProps>(), {
    type: 'button',
    variant: 'primary',
    disabled: false,
    className: '',
});

const emit = defineEmits<Emits>();

const handleClick = (event: MouseEvent) => {
    if (!props.disabled) {
        emit('click', event);
    }
};

</script>

<template>
    <button
        :type="type" :disabled="disabled" @click="handleClick"
        :class="className">
        <slot />
    </button>
</template>