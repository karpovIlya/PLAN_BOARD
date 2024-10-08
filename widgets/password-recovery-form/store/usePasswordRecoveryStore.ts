export const usePasswordRecoveryStore = defineStore('password-recovery-store', () => {
  const recoveryEmail = ref('')
  const recoveryCode = ref('')

  return { recoveryEmail, recoveryCode, }
})
