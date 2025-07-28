<template>
    <canvas v-if="!pfpUrl" ref="pfpCanvas" width="500" height="500" v-bind="$attrs"></canvas>
    <img v-else :src="pfpUrl" v-bind="$attrs" />
</template>

<script setup>
defineOptions({ inheritAttrs: false })

const pfpCanvas = ref(null)
const pfpUrl = ref('')
let ctx = null

const props = defineProps({
    uid: {
        type: String,
        default: ''
    }
})

const profile = ref(null)
const { userProfile } = useAuth()

onMounted(async () => {
    watch(
        [userProfile],
        async ([uProfile]) => {
            await nextTick()

            if (!pfpCanvas.value) return

            if (props.uid == '' && uProfile?.uid) {
                profile.value = uProfile
            } else if (props.uid) {
                profile.value = await $fetch('/api/public/getprofile', {
                    headers: { uid: props.uid }
                })
            }

            if (!profile.value) return

            if (profile.value.avatar) {
                pfpUrl.value = profile.value.avatar
            } else {
                ctx = pfpCanvas.value.getContext('2d')

                let text = ''
                profile.value.username.split(' ').forEach(word => {
                    text += word[0]
                })

                if (text.length > 2) text = text.slice(0, 2) + '.'

                const width = 500
                const height = 500
                const backgroundColor = '#101820'
                const textColor = '#10b981'

                ctx.fillStyle = backgroundColor
                ctx.fillRect(0, 0, width, height)

                ctx.font = 'bold 250px sans-serif'
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'

                const metrics = ctx.measureText(text)

                const actualHeight =
                    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

                const centerY = height / 2 + (metrics.actualBoundingBoxAscent - actualHeight / 2)

                ctx.fillStyle = textColor
                ctx.fillText(text, width / 2, centerY)

                pfpUrl.value = pfpCanvas.value.toDataURL('image/png')
            }
        },
        { immediate: true }
    )
})
</script>
