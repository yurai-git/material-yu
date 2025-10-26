<template>
  <YuLayout>
    <template #body>
      <YuPane>
        <h1>Nuxt module playground!</h1>
        <h2>Choose theme</h2>
        <p>Current theme: <strong>{{ theme }}</strong></p>
        <div style="display: flex; gap: 1rem;">
          <YuButton @click="setColorScheme('system')">
            System default
          </YuButton>
          <YuButton @click="setColorScheme('light')">
            Light
          </YuButton>
          <YuButton @click="setColorScheme('dark')">
            Dark
          </YuButton>
        </div>
        <h2>Choose contrast</h2>
        <p>Current contrast: <strong>{{ contrast }}</strong></p>
        <div style="display: flex; gap: 1rem;">
          <YuButton @click="setContrast('system')">
            System defualt
          </YuButton>
          <YuButton @click="setContrast('default')">
            Default
          </YuButton>
          <YuButton @click="setContrast('medium')">
            Medium
          </YuButton>
          <YuButton @click="setContrast('high')">
            High
          </YuButton>
        </div>
        <h2>Icons</h2>
        <!-- Using an icon name -->
        <YuIcon yu-icon-name="home" />
        <!-- Using a unicode code point -->
        <YuIcon yu-icon-name="&#xe8b8;" />
        <!-- Using an SVG child element -->
        <YuIcon>
          <svg viewBox="0 0 24 24">
            <path
              fill="#4285f4"
              d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
            />
            <path
              fill="#34a853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
            />
            <path
              fill="#fbbc05"
              d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
            />
            <path
              fill="#ea4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
            />
          </svg>
        </YuIcon>
        <YuIcon />
        <h2>Buttons</h2>
        <YuButton>Click me</YuButton>
        <h2>Focus ring, ripples, and state layers</h2>
        <div
          tabindex="0"
          style="height: 20rem; width: 20rem; border: var(--md-sys-color-outline-variant) 1px solid;"
        >
          <YuInteractive />
        </div>
      </YuPane>
    </template>
  </YuLayout>
</template>

<script setup>
import { useMaterialYu } from '#imports'

const { theme, contrast, setColorScheme, setContrast } = useMaterialYu()
</script>

<style lang="scss">
</style>
