<template>
    <web-view :src="url"></web-view>
</template>
 
<script>
    export default {
        data() {
            return {
                url: null  //要打开的外部链接
            }
        },
        onLoad: function (option) {
            this.url = option.url
        }
    }
</script>