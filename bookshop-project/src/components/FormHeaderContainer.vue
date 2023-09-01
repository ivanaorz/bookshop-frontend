 <!-- This is a component that provides a container for login and register headers. -->
<template>
        <header class="form-header-container">
        <h1>{{ header }}</h1>
        </header>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "FormHeaderContainer",
    props: {
      header: String
    },
  });
  </script>

  <style>
  .form-header-container{
     background-color: grey;
     padding: 1rem; 
     display: flex;
     flex-direction: column; 
     border-radius: 0.3rem;
     width: 550px;
     align-items: center;
  }
  .h1{
    color: white;
    font-weight: 400;
    font-size: 40px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin: auto;
  }
</style>