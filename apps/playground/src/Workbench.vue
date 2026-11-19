<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  WButton, WBadge, WCard, WCheckbox, WDialog, WIconButton,
  WInput, WProgress, WSelect, WSwitch, WTabs, WTextarea,
} from '@weepwood/ui-vue'

const compact = ref(false)
const enabled = ref(true)
const accepted = ref(false)
const dialogOpen = ref(false)
const name = ref('Weepwood UI')
const notes = ref('')
const size = ref('normal')
const activeTab = ref('overview')
const progress = ref(68)
const count = ref(0)
const densities = [
  { label: 'Compact', value: 'compact' },
  { label: 'Normal', value: 'normal' },
  { label: 'Comfortable', value: 'comfortable' },
]
const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Activity', value: 'activity' },
  { label: 'Restricted', value: 'restricted', disabled: true },
  { label: 'Settings', value: 'settings' },
]
watch([compact, size], () => {
  document.documentElement.dataset.density = compact.value ? 'compact' : size.value
}, { immediate: true })
</script>

<template>
  <section class="workbench">
    <header class="workbench__header">
      <div>
        <p class="eyebrow">WEEPWOOD / DESIGN SYSTEM</p>
        <h1>Component playground</h1>
        <p>Test the original twelve components as a consumer of the built Vue package.</p>
      </div>
      <WBadge tone="accent">12 components</WBadge>
    </header>
    <div class="workbench__preferences">
      <WSwitch v-model="compact" label="Force compact density" />
      <div id="demo-select" tabindex="-1"><WSelect v-model="size" label="Density" :options="densities" /></div>
    </div>
    <div class="workbench__grid">
      <WCard id="demo-card" tabindex="-1" title="Actions" elevated>
        <div class="workbench__stack">
          <div class="workbench__row">
            <WButton variant="primary" @click="count++">Clicked {{ count }} times</WButton>
            <WButton id="demo-dialog" variant="secondary" @click="dialogOpen = true">Open dialog</WButton>
            <WButton variant="ghost">Ghost</WButton>
            <WIconButton id="demo-iconbutton" label="Favorite" @click="count++">★</WIconButton>
          </div>
          <div id="demo-progress" tabindex="-1"><WProgress :value="progress" label="Upload progress" show-value /></div>
          <div class="workbench__row">
            <WButton size="sm" @click="progress = Math.max(0, progress - 10)">−10%</WButton>
            <WButton size="sm" @click="progress = Math.min(100, progress + 10)">+10%</WButton>
          </div>
        </div>
      </WCard>
      <WCard title="Form controls">
        <div class="workbench__form">
          <WInput v-model="name" label="Workspace" hint="Used to identify this project" placeholder="Project name" />
          <div id="demo-textarea" tabindex="-1"><WTextarea v-model="notes" label="Notes" placeholder="Add a note" /></div>
          <div id="demo-switch" tabindex="-1"><WSwitch v-model="enabled" label="Enable sync" /></div>
          <WCheckbox v-model="accepted" label="Accept local changes" />
          <WBadge :tone="accepted ? 'success' : 'warning'">{{ accepted ? 'Ready to publish' : 'Pending approval' }}</WBadge>
        </div>
      </WCard>
      <WCard id="demo-tabs" tabindex="-1" title="Navigation" class="workbench__wide">
        <WTabs v-model="activeTab" label="Workspace views" :items="tabs">
          <template #overview>This is the overview of {{ name }}.</template>
          <template #activity>Clicked actions {{ count }} times.</template>
          <template #settings>Synchronisation {{ enabled ? 'enabled' : 'disabled' }}.</template>
        </WTabs>
      </WCard>
    </div>
    <WDialog v-model="dialogOpen" title="Apply changes">
      The dialog uses the browser's native modal element. Press Escape or Close to dismiss.
      <template #footer>
        <WButton variant="secondary" @click="dialogOpen = false">Close</WButton>
        <WButton variant="primary" @click="dialogOpen = false">Confirm</WButton>
      </template>
    </WDialog>
  </section>
</template>
