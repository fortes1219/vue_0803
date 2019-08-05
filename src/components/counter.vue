<template>
	<div class="row horizontal static v_center" :style="{'color' : color}">
		<el-button @click="decrease"> - </el-button>
		<p data-space="space-horizontal">{{ text }} : {{ counter }}</p>
		<el-button @click="increase"> + </el-button>
	</div>
</template>
<script>
export default {
	name: 'tempCounter',
	props: {
		color: {
			type: String,
			default: '#000'
		},
		text: {
			type: String,
			default: 'counter'
		},
		counter: {
			type: Number,
			default: 0
		}
	},
	methods: {
		decrease() {
			// 這邊等於v-on:update:counter的意思，Vue內建的API做更新
			this.$emit('update:counter', this.counter - 1)
		},
		increase() {
			this.$emit('update:counter', this.counter + 1)
		}
	}
}
</script>
