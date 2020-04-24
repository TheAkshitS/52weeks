<template>
  <img
    src="@/assets/images/wallet.svg"
    loading="lazy"
    alt="Wallet image"
    :width="width"
  />
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      required: true
    }
  }
}
</script>
