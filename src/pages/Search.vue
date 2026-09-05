<script setup>
import { onMounted, ref } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { api } from '../services/api'
import { useCartStore } from '../stores/cart'

const q = ref('')
const products = ref([])
const loading = ref(false)
const cart = useCartStore()
async function search () { loading.value = true; try { const response = await api.products(`?q=${encodeURIComponent(q.value)}&limit=50`); products.value = response?.data || response || [] } catch { products.value = [] } finally { loading.value = false } }
function addToCart (product) { cart.add(product) }
onMounted(search)
</script>
<template><section class="catalog catalog-vora" dir="rtl"><div class="catalog-head-vora"><div><span class="eyebrow">البحث</span><h1>نتائج البحث</h1><p>ابحث عن منتجات VORA.</p></div><div class="search-box"><input v-model="q" aria-label="بحث عن المنتجات" placeholder="اسم المنتج أو الرمز" @keyup.enter="search"><button class="button button-dark" @click="search">بحث</button></div></div><p v-if="loading">جاري البحث...</p><div v-else-if="!products.length" class="empty-state-vora"><h2>لا توجد نتائج</h2><p>جرّب كلمة بحث مختلفة.</p></div><div v-else class="product-grid-vora"><ProductCard v-for="product in products" :key="product.id" :product="product" @add="addToCart" /></div></section></template>
