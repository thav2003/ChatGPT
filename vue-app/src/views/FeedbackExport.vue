<template>
  <a-style-provider hash-priority="high">
    <a-typography-title>Feedback Export</a-typography-title>
    <a-form
      :model="formState"
      name="horizontal_login"
      layout="vertical"
      autocomplete="off"
      @finish="onFinish"
      @finish-failed="onFinishFailed"
    >
      <a-space>
        <a-form-item label="From" required name="from">
          <a-date-picker v-model:value="formState.from" type="date" placeholder="From date" style="width: 100%" />
        </a-form-item>
        <a-form-item label="To" required name="to">
          <a-date-picker v-model:value="formState.to" type="date" placeholder="To date" style="width: 100%" />
        </a-form-item>
      </a-space>

      <a-form-item>
        <a-button :disabled="disabled" type="primary" html-type="submit">Export</a-button>
      </a-form-item>
    </a-form>
  </a-style-provider>
</template>
<script lang="ts" setup>
  import { Dayjs } from 'dayjs'
  import { reactive, computed, UnwrapRef } from 'vue'
  interface FormState {
    from: Dayjs | undefined
    to: Dayjs | undefined
  }

  const formState: UnwrapRef<FormState> = reactive<FormState>({
    from: undefined,
    to: undefined
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const disabled = computed(() => {
    return !(formState.from && formState.to)
  })
</script>
