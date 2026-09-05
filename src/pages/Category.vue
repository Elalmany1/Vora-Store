<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { api } from '../services/api'
import { useCartStore } from '../stores/cart'

const route = useRoute(); const router = useRouter()
const products = ref([]); const categories = ref([]); const loading = ref(true)
const cart = useCartStore()
const search = ref(route.query.q || ''); const sort = ref(route.query.sort || 'newest'); const category = ref(route.query.category || '')
const min = ref(route.query.min || ''); const max = ref(route.query.max || '')
const fallback = [
  {id:1,name:'طاولة جانبية مودرن',brand:'VORA Home',price:1290,stock:12,category_slug:'home',image_url:'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=700&q=80'},
  {id:2,name:'كرسي Lounge فاخر',brand:'VORA Home',price:3490,stock:7,category_slug:'chairs',image_url:'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=700&q=80'},
  {id:3,name:'مصباح أرضي Minimal',brand:'VORA Lighting',price:1890,stock:18,category_slug:'lighting',image_url:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80'},
  {id:4,name:'وحدة تلفزيون خشبية',brand:'VORA Home',price:4990,stock:4,category_slug:'tv-units',image_url:'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=700&q=80'},
  {id:5,name:'مرآة دائرية أنيقة',brand:'VORA Decor',price:1590,stock:20,category_slug:'mirrors',image_url:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=80'},
  {id:6,name:'وحدة تخزين عملية',brand:'VORA Home',price:2890,stock:9,category_slug:'storage',image_url:'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=700&q=80'}
]

const queryString = computed(() => {
  const params = new URLSearchParams()
  if (search.value) params.set('q', search.value)
  if (category.value) params.set('category', category.value)
  if (sort.value) params.set('sort', sort.value)
  if (min.value) params.set('min', min.value)
  if (max.value) params.set('max', max.value)
  return params.toString()
})

async function load() {
  loading.value = true
  try {
    const [cats, data] = await Promise.all([api.categories(), api.products(`?${queryString.value}&limit=50`)]);
    categories.value = cats?.data || cats || []
    products.value = data?.data || data?.products || data || []
  } catch { categories.value = []; products.value = [] }
  finally { loading.value = false }
}
function apply() { router.replace(`/shop?${queryString.value}`) }
function addToCart(product) { cart.add(product) }
watch(() => route.fullPath, () => { search.value=route.query.q||''; category.value=route.query.category||''; sort.value=route.query.sort||'newest'; min.value=route.query.min||''; max.value=route.query.max||''; load() })
onMounted(load)
</script>
<template>
  <section class="catalog catalog-vora" dir="rtl">
    <div class="breadcrumb">الرئيسية / المتجر</div>
    <div class="catalog-head-vora"><div><span class="eyebrow">كل المنتجات</span><h1>المتجر</h1><p>كل منتجات VORA في مكان واحد، مع فلترة وترتيب سريع.</p></div><select v-model="sort" @change="apply"><option value="newest">الأحدث</option><option value="price_asc">السعر: من الأقل للأعلى</option><option value="price_desc">السعر: من الأعلى للأقل</option><option value="name">الاسم</option></select></div>
    <div class="catalog-layout-vora">
      <aside class="filters filters-vora">
        <label>بحث<input v-model="search" placeholder="اسم المنتج أو SKU" @keyup.enter="apply"></label>
        <label>القسم<select v-model="category" @change="apply"><option value="">كل الأقسام</option><option v-for="c in categories" :key="c.id" :value="c.slug">{{ c.name }}</option></select></label>
        <b>السعر</b><div class="range"><input v-model="min" type="number" placeholder="من"><input v-model="max" type="number" placeholder="إلى"></div>
        <button class="button button-orange full" @click="apply">تطبيق الفلاتر</button>
        <button class="text-button" @click="search='';category='';min='';max='';sort='newest';apply()">مسح الكل</button>
      </aside>
      <div>
        <div v-if="loading" class="product-grid-vora"><div v-for="n in 6" :key="n" class="product-skeleton"></div></div>
        <div v-else-if="!products.length" class="empty-state-vora"><h2>لا توجد منتجات مطابقة</h2><p>جرّب إزالة بعض الفلاتر أو البحث بكلمة مختلفة.</p></div>
        <div v-else class="product-grid-vora"><ProductCard v-for="p in products" :key="p.id" :product="p" @add="addToCart"/></div>
      </div>
    </div>
  </section>
</template>
