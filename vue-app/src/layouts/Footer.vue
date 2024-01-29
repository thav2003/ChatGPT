<template>
  <div class="w-full pt-2 md:pt-0 border-white/20 md:border-transparent md:w-[calc(100%-.5rem)]">
    <form class="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
      <div class="relative flex h-full flex-1 items-stretch md:flex-col">
        <div class="flex w-full items-center">
          <div
            class="overflow-hidden [&:has(textarea:focus)]:border-token-border-xheavy [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] flex flex-col w-full dark:border-token-border-heavy flex-grow relative border border-token-border-heavy dark:text-white rounded-2xl bg-white dark:bg-gray-800 shadow-[0_0_0_2px_rgba(255,255,255,0.95)] dark:shadow-[0_0_0_2px_rgba(52,53,65,0.95)]"
          >
            <textarea
              id="prompt-textarea"
              v-model="messageContent"
              tabindex="0"
              data-id="root"
              rows="1"
              placeholder="Message ChatGPT…"
              class="m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-3.5 md:pr-12 placeholder-black/50 dark:placeholder-white/50 pl-3 md:pl-4"
              style="max-height: 200px; height: 52px; overflow-y: hidden"
            ></textarea
            ><button
              class="absolute md:bottom-3 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 dark:disabled:bg-white disabled:bg-black disabled:opacity-10 disabled:text-gray-400 enabled:bg-black text-white p-0.5 border border-black rounded-lg dark:border-white dark:bg-white bottom-1.5 transition-colors"
              type="button"
              @click="sendMessage"
            >
              <span class="" data-state="closed"
                ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-white dark:text-black">
                  <path
                    d="M7 11L12 6L17 11M12 18V7"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
    <div class="relative px-2 py-2 text-center text-xs text-gray-600 dark:text-gray-300 md:px-[60px]">
      <span>ChatGPT can make mistakes. Consider checking important information.</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watchEffect } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import windowStore from '../../../share/store/store'

  const route = useRoute()
  const router = useRouter()
  const messageContent = ref('')
  const id = ref<string | string[]>()
  const user = windowStore.getUser()
  const getListConservation = () => windowStore.getListConservation()
  const sendMessage = async () => {
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: messageContent.value
        }
      ]
    }
    const response = await fetch(`http://172.188.16.85:8080/api/v1/chat${id.value ? '?id=' + id.value : ''}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`
      },
      body: JSON.stringify(data)
    })
    const responseData = await response.json()
    console.log('Response Data:', responseData)
    messageContent.value = ''

    console.log(id.value)
    console.log(responseData)
    if (!id.value) {
      getListConservation()
      router.push({ name: 'Conservation', params: { id: responseData.conversationId } })
    } else {
      windowStore.getListMessage(id.value as string)
    }
  }
  watchEffect(() => {
    id.value = route.params.id
  })
</script>
