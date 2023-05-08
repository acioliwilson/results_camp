<template>
  <router-view />
</template>

<script>

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #262626;
  border-radius: 5px;
}

body {
  font-family: 'Poppins', sans-serif !important;
  color: #464646 !important;
  box-sizing: border-box !important;
}
.router-link-exact-active {
  font-weight: 500;
}
</style>
