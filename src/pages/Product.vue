<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { api } from '../services/api'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const product = ref(null)
const loading = ref(true)
const error = ref('')
const qty = ref(1)
const selectedImage = ref('')
const gallery = computed(() => product.value?.image_url ? [product.value.image_url] : [])

async function loadProduct () {
  loading.value = true
  try {
    const response = await api.product(route.params.id)
    product.value = response?.data || response
    selectedImage.value = product.value?.image_url || ''
    if (!product.value) error.value = 'المنتج غير موجود.'
  } catch { error.value = 'تعذر تحميل المنتج الآن.' } finally { loading.value = false }
}
function addToCart () {
  if (!product.value) return
  cart.add(product.value, qty.value)
  router.push('/cart')
}
onMounted(loadProduct)
</script>

<template>
  <section v-if="loading" class="section-vora loading-state" dir="rtl"><p>جاري تحميل المنتج...</p></section>
  <section v-else-if="error" class="section-vora empty-state-vora" dir="rtl"><h1>{{ error }}</h1><RouterLink class="button button-orange" to="/shop">العودة للمتجر</RouterLink></section>
  <template v-else-if="product">
    <section class="product-detail" dir="rtl">
      <div class="product-gallery">
        <div class="large-product-image"><img :src="selectedImage || product.image_url" :alt="product.name" /></div>
        <div v-if="gallery.length" class="thumbs"><button v-for="image in gallery" :key="image" class="thumb" :class="{ active: selectedImage === image }" @click="selectedImage = image"><img :src="image" :alt="product.name" /></button></div>
      </div>
      <div class="product-copy">
        <span class="eyebrow">{{ product.brand || 'VORA' }} · SKU {{ product.sku || 'N/A' }}</span>
        <h1>{{ product.name }}</h1>
        <div class="price">{{ Number(product.price || 0).toLocaleString('ar-EG') }} ج.م</div>
        <p class="stock">{{ product.stock > 0 ? `متوفر · ${product.stock} قطعة` : 'غير متوفر حالياً' }}</p>
        <p class="product-description">{{ product.description || 'منتج مختار بعناية من مجموعة VORA.' }}</p>
        <div class="purchase"><input v-model.number="qty" type="number" min="1" :max="product.stock || 1" aria-label="الكمية"><button class="button button-orange" :disabled="!product.stock" @click="addToCart">أضف للسلة</button><RouterLink class="button button-dark" to="/cart">عرض السلة</RouterLink></div>
      </div>
    </section>
    <section class="section specs" dir="rtl"><span class="eyebrow">تفاصيل المنتج</span><h2>مصمم لبيتك.</h2><div class="spec-grid"><div><small>القسم</small><b>{{ product.category_name || 'VORA Home' }}</b></div><div><small>الحالة</small><b>{{ product.status === 'PUBLISHED' ? 'متاح' : product.status }}</b></div><div><small>العلامة</small><b>{{ product.brand || 'VORA' }}</b></div><div><small>رمز المنتج</small><b>{{ product.sku || 'N/A' }}</b></div></div></section>
  </template>
</template>
