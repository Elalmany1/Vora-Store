<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter(); const email = ref(''); const password = ref(''); const error = ref('')
function login () { if (!email.value || !password.value) { error.value = 'أدخل البريد وكلمة المرور.'; return }; localStorage.setItem('vora-user', JSON.stringify({ email: email.value })); router.push('/account') }
</script>
<template><section class="auth" dir="rtl"><div><span class="eyebrow">بوابة الدخول الآمنة</span><h1>مرحباً بعودتك.</h1><p>سجل الدخول لإدارة طلباتك وعناوينك.</p></div><form class="auth-card" @submit.prevent="login"><label>البريد الإلكتروني<input v-model="email" type="email" placeholder="name@company.com" required></label><label>كلمة المرور<input v-model="password" type="password" required></label><p v-if="error" class="form-error">{{ error }}</p><button class="button button-orange full">تسجيل الدخول</button><small>ليس لديك حساب؟ <RouterLink to="/register">إنشاء حساب</RouterLink></small></form></section></template>
