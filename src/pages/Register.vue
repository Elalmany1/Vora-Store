<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter(); const name = ref(''); const email = ref(''); const password = ref(''); const confirm = ref(''); const error = ref('')
function register () { if (password.value !== confirm.value) { error.value = 'كلمتا المرور غير متطابقتين.'; return }; localStorage.setItem('vora-user', JSON.stringify({ name: name.value, email: email.value })); router.push('/account') }
</script>
<template><section class="auth" dir="rtl"><div><span class="eyebrow">حساب VORA</span><h1>أنشئ حسابك.</h1><p>احفظ عناوينك وتابع طلباتك بسهولة.</p></div><form class="auth-card" @submit.prevent="register"><label>الاسم الكامل<input v-model="name" required></label><label>البريد الإلكتروني<input v-model="email" type="email" required></label><label>كلمة المرور<input v-model="password" type="password" required></label><label>تأكيد كلمة المرور<input v-model="confirm" type="password" required></label><p v-if="error" class="form-error">{{ error }}</p><button class="button button-orange full">إنشاء الحساب</button><small>لديك حساب؟ <RouterLink to="/login">تسجيل الدخول</RouterLink></small></form></section></template>
