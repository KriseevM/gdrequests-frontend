<template>
        <p :class="success ? 'text-success' : 'text-danger'"><slot></slot></p>
</template>

<script>
export default ({
    props: {
        success: Boolean,
    }
})
</script>