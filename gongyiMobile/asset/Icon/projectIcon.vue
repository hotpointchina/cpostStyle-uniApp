<template>
   
	<!-- QQ -->
	<template v-if="type==='order'">
			<image class="icon" :style="{ ...selfImgStyle }" src="/static/tempPic/testDemo/dingdan.svg" />
	</template>
			
</template>

<script>
export default {
    name:'customerIcon',
    props:[ 'type', 'imgStyle' ],
    computed:{
        selfImgStyle(){ return !!this.imgStyle ? this.imgStyle : {
					width:'64px',
					height:'64px',
					fill:"#24A562"
				}; },
    }
}
</script>
