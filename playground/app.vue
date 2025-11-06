<template>
  <YuLayout>
    <template #body>
      <YuPane>
        <h1>Material Yu playground</h1>
        <h2>Choose theme</h2>
        <p>Current theme: <strong>{{ theme }}</strong></p>
        <div class="row">
          <YuButton @click="setColorScheme('system')">
            System default
          </YuButton>
          <YuButton
            yu-color="tonal"
            @click="setColorScheme('light')"
          >
            Light
          </YuButton>
          <YuButton
            yu-color="tonal"
            @click="setColorScheme('dark')"
          >
            Dark
          </YuButton>
        </div>
        <h2>Choose contrast</h2>
        <p>Current contrast: <strong>{{ contrast }}</strong></p>
        <div class="row">
          <YuButton @click="setContrast('system')">
            System defualt
          </YuButton>
          <YuButton
            yu-color="tonal"
            @click="setContrast('default')"
          >
            Default
          </YuButton>
          <YuButton
            yu-color="tonal"
            @click="setContrast('medium')"
          >
            Medium
          </YuButton>
          <YuButton
            yu-color="tonal"
            @click="setContrast('high')"
          >
            High
          </YuButton>
        </div>
        <h2>Icons</h2>
        <div class="row">
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
        </div>
        <h2>Buttons</h2>
        <h3>Toggle</h3>
        <div class="row">
          <YuButton
            v-model:checked="toggled"
            yu-type="toggle"
          >
            <YuIcon yu-icon-name="edit" />
            Toggle button
          </YuButton>
          <p>
            Button is <strong>{{ toggled ? 'checked' : 'unchecked' }}</strong>
          </p>
        </div>
        <h3>Color</h3>
        <h4>Elevated</h4>
        <div class="column">
          <div class="row">
            <YuButton yu-color="elevated">
              <YuIcon yu-icon-name="edit" />
              Button
            </YuButton>
            <YuButton
              yu-color="elevated"
              yu-shape="square"
            >
              Button
            </YuButton>
            <YuButton
              disabled
              yu-color="elevated"
            >
              Button
            </YuButton>
            <YuButton
              disabled
              yu-color="elevated"
              yu-shape="square"
            >
              Button
            </YuButton>
          </div>
          <div class="row">
            <YuButton
              yu-color="elevated"
              yu-type="toggle"
            >
              <YuIcon yu-icon-name="edit" />
              Button
            </YuButton>
            <YuButton
              yu-color="elevated"
              yu-shape="square"
              yu-type="toggle"
              checked
            >
              Button
            </YuButton>
            <YuButton
              disabled
              yu-color="elevated"
              yu-type="toggle"
            >
              Button
            </YuButton>
            <YuButton
              disabled
              yu-color="elevated"
              yu-shape="square"
              yu-type="toggle"
              checked
            >
              Button
            </YuButton>
          </div>
        </div>
        <h4>Filled</h4>
        <div class="column">
          <div class="row">
            <YuButton>
              <YuIcon yu-icon-name="edit" />
              Button
            </YuButton>
            <YuButton yu-shape="square">
              Button
            </YuButton>
            <YuButton disabled>
              Button
            </YuButton>
            <YuButton
              yu-shape="square"
              disabled
            >
              Button
            </YuButton>
          </div>
          <div class="row">
            <YuButton yu-type="toggle">
              <YuIcon yu-icon-name="edit" />
              Button
            </YuButton>
            <YuButton
              yu-shape="square"
              yu-type="toggle"
              checked
            >
              Button
            </YuButton>
            <YuButton
              disabled
              yu-type="toggle"
            >
              Button
            </YuButton>
            <YuButton
              yu-shape="square"
              disabled
              yu-type="toggle"
              checked
            >
              Button
            </YuButton>
          </div>
        </div>
        <h4>Tonal</h4>
        <div class="column">
          <div class="row">
            <YuButton yu-color="tonal">
              <YuIcon yu-icon-name="edit" />
              Button
            </YuButton>
            <YuButton
              yu-color="tonal"
              yu-shape="square"
            >
              Button
            </YuButton>
            <YuButton
              disabled
              yu-color="tonal"
            >
              Button
            </YuButton>
            <YuButton
              disabled
              yu-color="tonal"
              yu-shape="square"
            >
              Button
            </YuButton>
          </div>
          <div class="row">
            <YuButton
              yu-color="tonal"
              yu-type="toggle"
            >
              <YuIcon yu-icon-name="edit" />
              Button
            </YuButton>
            <YuButton
              yu-color="tonal"
              yu-shape="square"
              yu-type="toggle"
              checked
            >
              Button
            </YuButton>
            <YuButton
              disabled
              yu-color="tonal"
              yu-type="toggle"
            >
              Button
            </YuButton>
            <YuButton
              disabled
              yu-color="tonal"
              yu-shape="square"
              yu-type="toggle"
              checked
            >
              Button
            </YuButton>
          </div>
        </div>
        <h4>Outlined</h4>
        <div class="column">
          <div class="row">
            <YuButton yu-color="outlined">
              <YuIcon yu-icon-name="edit" />
              Button
            </YuButton>
            <YuButton
              yu-color="outlined"
              yu-shape="square"
            >
              Button
            </YuButton>
            <YuButton
              disabled
              yu-color="outlined"
            >
              Button
            </YuButton>
            <YuButton
              disabled
              yu-color="outlined"
              yu-shape="square"
            >
              Button
            </YuButton>
          </div>
          <div class="row">
            <YuButton
              yu-color="outlined"
              yu-type="toggle"
            >
              <YuIcon yu-icon-name="edit" />
              Button
            </YuButton>
            <YuButton
              yu-color="outlined"
              yu-shape="square"
              yu-type="toggle"
              checked
            >
              Button
            </YuButton>
            <YuButton
              disabled
              yu-color="outlined"
              yu-type="toggle"
            >
              Button
            </YuButton>
            <YuButton
              disabled
              yu-color="outlined"
              yu-shape="square"
              yu-type="toggle"
              checked
            >
              Button
            </YuButton>
          </div>
        </div>
        <h4>Text</h4>
        <div class="row">
          <YuButton yu-color="text">
            <YuIcon yu-icon-name="edit" />
            Button
          </YuButton>
          <YuButton
            yu-color="text"
            yu-shape="square"
          >
            Button
          </YuButton>
          <YuButton
            disabled
            yu-color="text"
          >
            Button
          </YuButton>
          <YuButton
            disabled
            yu-color="text"
            yu-shape="square"
          >
            Button
          </YuButton>
        </div>
        <h3>Size</h3>
        <div class="column">
          <div class="row">
            <YuButton yu-size="xsmall">
              <YuIcon yu-icon-name="edit" />
              Xsmall
            </YuButton>
            <YuButton>
              <YuIcon yu-icon-name="edit" />
              Small
            </YuButton>
            <YuButton yu-size="medium">
              <YuIcon yu-icon-name="edit" />
              Medium
            </YuButton>
            <YuButton yu-size="large">
              <YuIcon yu-icon-name="edit" />
              Large
            </YuButton>
            <YuButton yu-size="xlarge">
              <YuIcon yu-icon-name="edit" />
              Xlarge
            </YuButton>
          </div>
          <div class="row">
            <YuButton
              yu-size="xsmall"
              yu-type="toggle"
            >
              <YuIcon yu-icon-name="edit" />
              Xsmall
            </YuButton>
            <YuButton yu-type="toggle">
              <YuIcon yu-icon-name="edit" />
              Small
            </YuButton>
            <YuButton
              yu-size="medium"
              yu-type="toggle"
            >
              <YuIcon yu-icon-name="edit" />
              Medium
            </YuButton>
            <YuButton
              yu-size="large"
              yu-type="toggle"
            >
              <YuIcon yu-icon-name="edit" />
              Large
            </YuButton>
            <YuButton
              yu-size="xlarge"
              yu-type="toggle"
              checked
            >
              <YuIcon yu-icon-name="edit" />
              Xlarge
            </YuButton>
          </div>
        </div>
        <h3>Link</h3>
        <div class="row">
          <YuButton
            href="https://m3.material.io/"
            target="_blank"
          >
            <YuIcon yu-icon-name="edit" />
            Button
          </YuButton>
        </div>
        <h2>Focus rings, ripples, and state layers</h2>
        <div
          tabindex="0"
          style="height: 18.75rem; width: 18.75rem; border: var(--md-sys-color-outline-variant) 1px solid;"
        >
          <YuInteractive />
        </div>
      </YuPane>
    </template>
  </YuLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useMaterialYu } from '#imports'

const { theme, contrast, setColorScheme, setContrast } = useMaterialYu()
const toggled = ref(false)
</script>

<style lang="scss">
.column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-wrap: wrap;
}
.row {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
