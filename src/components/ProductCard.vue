<script setup>
const emit = defineEmits(['add'])
defineProps({ product: { type: Object, required: true } })
</script>
<template>
  <article class="product-card-vora">
    <RouterLink :to="`/product/${product.id}`" class="product-card-link">
      <div class="product-image-vora">
        <span v-if="product.badge" class="badge-vora">{{ product.badge }}</span>
        <img v-if="product.image_url" :src="product.image_url" :alt="product.name" loading="lazy" />
        <div v-else class="device-shape"></div>
      </div>
      <div class="product-meta-vora">
        <small>{{ product.brand || 'VORA' }}</small>
        <h3>{{ product.name }}</h3>
        <p>{{ product.spec || product.description || 'تصميم عملي بجودة عالية' }}</p>
        <strong>{{ Number(product.price || 0).toLocaleString('ar-EG') }} ج.م</strong>
      </div>
    </RouterLink>
    <button class="button button-dark full" :disabled="product.stock === 0" @click.stop="emit('add', product)">{{ product.stock === 0 ? 'غير متوفر' : 'أضف للسلة' }}</button>
  </article>
</template>
