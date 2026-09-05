<script setup>
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
</script>

<template>
  <section class="checkout-page" dir="rtl">
    <div>
      <span class="eyebrow">السلة</span><h1>سلة التسوق</h1><p>راجع المنتجات المختارة قبل إتمام الطلب.</p>
      <div v-if="cart.items.length" class="cart-list">
        <article v-for="item in cart.items" :key="item.id" class="cart-item">
          <div class="cart-thumb"><img v-if="item.image_url" :src="item.image_url" :alt="item.name"></div>
          <div><h3>{{ item.name }}</h3><small>SKU: {{ item.sku || 'N/A' }} · {{ item.stock > 0 ? 'متوفر' : 'غير متوفر' }}</small><div class="qty"><button @click="cart.setQty(item.id, item.qty - 1)">−</button><b>{{ item.qty }}</b><button @click="cart.setQty(item.id, item.qty + 1)">+</button></div></div>
          <strong>{{ (item.price * item.qty).toLocaleString('ar-EG') }} ج.م</strong><button class="text-button" @click="cart.remove(item.id)">حذف</button>
        </article>
      </div>
      <div v-else class="empty-state-vora"><h2>السلة فارغة</h2><p>أضف منتجاً من المتجر ليظهر هنا.</p><RouterLink class="button button-orange" to="/shop">تصفح المنتجات</RouterLink></div>
    </div>
    <aside v-if="cart.items.length" class="summary"><h3>ملخص السلة</h3><div><span>المجموع الفرعي ({{ cart.count }})</span><b>{{ cart.subtotal.toLocaleString('ar-EG') }} ج.م</b></div><div><span>الخصم</span><b>-{{ cart.discount.toLocaleString('ar-EG') }} ج.م</b></div><hr><div class="total"><span>الإجمالي</span><b>{{ cart.total.toLocaleString('ar-EG') }} ج.م</b></div><RouterLink class="button button-orange full" to="/checkout/shipping">إتمام الشراء</RouterLink></aside>
  </section>
</template>
