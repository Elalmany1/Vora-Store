<script setup>
import { Search, ShoppingCart, User, Menu, X } from 'lucide-vue-next'
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
const mobileOpen = ref(false)
const close = () => { mobileOpen.value = false }
</script>
<template>
  <header class="nav nav-vora" dir="rtl">
    <div class="nav-main">
      <button class="mobile-menu-button" aria-label="فتح القائمة" @click="mobileOpen = true"><Menu :size="21"/></button>
      <RouterLink to="/" class="brand brand-vora">VORA</RouterLink>
      <nav class="desktop-nav">
        <RouterLink to="/shop">المتجر</RouterLink>
        <a href="/#categories">الأقسام</a>
        <a href="/#recent">وصل حديثاً</a>
      </nav>
      <div class="nav-actions">
        <RouterLink to="/search" aria-label="بحث"><Search :size="19"/></RouterLink>
        <RouterLink to="/account" aria-label="حسابي"><User :size="19"/></RouterLink>
        <RouterLink to="/cart" class="cart-link" aria-label="السلة"><ShoppingCart :size="19"/><span>{{ cart.count }}</span></RouterLink>
      </div>
    </div>
    <div v-if="mobileOpen" class="mobile-drawer-backdrop" @click="close"></div>
    <aside :class="['mobile-drawer', { open: mobileOpen }]" dir="rtl">
      <div class="drawer-head"><span class="brand brand-vora">VORA</span><button @click="close" aria-label="إغلاق"><X :size="22"/></button></div>
      <RouterLink to="/shop" @click="close">المتجر</RouterLink>
      <a href="/#categories" @click="close">الأقسام</a>
      <a href="/#recent" @click="close">وصل حديثاً</a>
      <RouterLink to="/account" @click="close">حسابي</RouterLink>
    </aside>
  </header>
</template>
