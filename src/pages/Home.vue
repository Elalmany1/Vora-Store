<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { api } from '../services/api'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const categories = ref([])
const recentProducts = ref([])
const loading = ref(true)
const cart = useCartStore()

const fallbackCategories = [
  { id: 1, name: 'أثاث خارجي', slug: 'outdoor-furniture', image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=240&q=80' },
  { id: 2, name: 'أدوات المطبخ و الخَبز', slug: 'kitchen-tools', image_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=240&q=80' },
  { id: 3, name: 'سجاد', slug: 'rugs', image_url: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=240&q=80' },
  { id: 4, name: 'بين باج', slug: 'bean-bags', image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=240&q=80' },
  { id: 5, name: 'مستلزمات المطبخ و المنزل', slug: 'home-kitchen', image_url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=240&q=80' },
  { id: 6, name: 'كراسي', slug: 'chairs', image_url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=240&q=80' },
  { id: 7, name: 'إضاءة', slug: 'lighting', image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=240&q=80' },
  { id: 8, name: 'وحدات التلفزيون', slug: 'tv-units', image_url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=240&q=80' },
  { id: 9, name: 'مراتب و مفارش', slug: 'mattresses', image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=240&q=80' },
  { id: 10, name: 'ديكورات', slug: 'decor', image_url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=240&q=80' },
  { id: 11, name: 'ستائر', slug: 'curtains', image_url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=240&q=80' },
  { id: 12, name: 'مرايا', slug: 'mirrors', image_url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=240&q=80' },
  { id: 13, name: 'المطبخ', slug: 'kitchen', image_url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=240&q=80' },
  { id: 14, name: 'الأثاث المكتبي', slug: 'office-furniture', image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=240&q=80' },
  { id: 15, name: 'الدواليب', slug: 'wardrobes', image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=240&q=80' },
  { id: 16, name: 'وحدات التخزين و الجزامات', slug: 'storage', image_url: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=240&q=80' }
]

const fallbackRecent = [
  { id: 101, name: 'طاولة جانبية مودرن', brand: 'VORA Home', price: 1290, stock: 12, image_url: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=700&q=80' },
  { id: 102, name: 'كرسي Lounge فاخر', brand: 'VORA Home', price: 3490, stock: 7, image_url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=700&q=80' },
  { id: 103, name: 'مصباح أرضي Minimal', brand: 'VORA Lighting', price: 1890, stock: 18, image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80' },
  { id: 104, name: 'وحدة تلفزيون خشبية', brand: 'VORA Home', price: 4990, stock: 4, image_url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=700&q=80' }
]

onMounted(async () => {
  try {
    const [catResponse, productResponse] = await Promise.all([
      api.categories(),
      api.products('?sort=newest&limit=8')
    ])
    categories.value = catResponse?.data || catResponse || []
    recentProducts.value = productResponse?.data || productResponse?.products || productResponse || []
  } catch {
    categories.value = []
    recentProducts.value = []
  } finally {
    loading.value = false
  }
})

function openCategory(category) {
  router.push(`/shop?category=${encodeURIComponent(category.slug)}`)
}

function addToCart(product) { cart.add(product) }
</script>

<template>
  <div class="home-page" dir="rtl">
    <section class="hero hero-vora">
      <div class="hero-copy">
        <span class="eyebrow">وصل حديثاً</span>
        <h1>اختار اللي يشبه<br><em>بيتك.</em></h1>
        <p>اكتشف تشكيلتنا الجديدة من الأثاث والإضاءة ومستلزمات المنزل بتصميم عملي وأنيق.</p>
        <div class="actions">
          <RouterLink class="button button-orange" to="/shop">تسوق الآن</RouterLink>
          <a class="button button-ghost" href="#categories">استكشف الأقسام</a>
        </div>
      </div>
      <div class="hero-art hero-art-home" aria-hidden="true">
        <div class="hero-room-card"></div>
      </div>
    </section>

    <section id="categories" class="categories-section section-vora">
      <div class="categories-title">الأقسام</div>
      <div v-if="loading" class="category-grid category-skeleton">
        <span v-for="n in 16" :key="n"></span>
      </div>
      <div v-else class="category-grid">
        <button v-for="category in categories" :key="category.id" class="category-item" @click="openCategory(category)">
          <span class="category-image"><img :src="category.image_url" :alt="category.name" loading="lazy" /></span>
          <span>{{ category.name }}</span>
        </button>
      </div>
      <div class="carousel-dots" aria-hidden="true"><span class="active"></span><span></span></div>
    </section>

    <section id="recent" class="recent-section section-vora">
      <div class="section-head-vora">
        <div>
          <span class="eyebrow">وصل حديثاً</span>
          <h2>أحدث المنتجات</h2>
        </div>
        <RouterLink to="/shop?sort=newest">عرض الكل</RouterLink>
      </div>
      <div class="recent-slider">
        <ProductCard v-for="product in recentProducts" :key="product.id" :product="product" @add="addToCart" />
      </div>
    </section>

    <section class="section-vora popular-section">
      <div class="section-head-vora">
        <div><span class="eyebrow">مختاراتنا</span><h2>منتجات تستحق التجربة</h2></div>
        <RouterLink to="/shop">كل المنتجات</RouterLink>
      </div>
      <div class="product-grid-vora">
        <ProductCard v-for="product in recentProducts.slice(0, 4)" :key="`p-${product.id}`" :product="product" @add="addToCart" />
      </div>
    </section>
  </div>
</template>
