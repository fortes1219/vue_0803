<template>
	<div class="row horizontal v_center">
		<el-radio-group v-if="durationsDisplay" v-model="duration.select" @change="durationChange" key="duration">
			<el-radio-button v-for="(item, index) in duration.items" :key="index" :label="item.label">{{ item.name }}</el-radio-button>
		</el-radio-group>
		<el-radio-group v-if="onSaleDisplay" v-model="onSale.select" @change="onSaleChange" key="onSale">
			<el-radio-button v-for="(item, index) in onSale.items" :key="index" :label="item.label">{{ item.name }}</el-radio-button>
		</el-radio-group>
	</div>
</template>
<script>
export default {
	name: 'tabs',
	props: {
		durationsDisplay: {
			type: Boolean,
			default: false
		},
		onSaleDisplay: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			duration: {
				select: 0,
				items: [
					{ label: 0, name: '本日' },
					{ label: 1, name: '本週' },
					{ label: 2, name: '本月' }
				]
			},

			onSale: {
				select: 0,
				items: [
					{ label: 0, name: '推薦' },
					{ label: 1, name: '人氣' },
					{ label: 2, name: '最新' }
				]
			}
		}
	},

	methods: {
		durationChange(val) {
			this.duration.select = val
			this.$emit('tabDuration', val)
		},
		onSaleChange(val) {
			this.onSale.select = val
			this.$emit('tabOnSale', val)
		}
	},

	created() {
		this.durationChange(this.duration.select)
		this.onSaleChange(this.onSale.select)
	}
}
</script>