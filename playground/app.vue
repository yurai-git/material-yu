<template>
  <YuLayout>
    <template #body>
      <YuPane>
        <h1>Material Yu playground</h1>
        <h2>Theme</h2>
        <p>Current theme: <strong>{{ theme }}</strong></p>
        <div class="row">
          <YuButton
            yu-icon="routine"
            yu-text="System default"
            @click="setColorScheme('system')"
          />
          <YuButton
            yu-color="tonal"
            yu-icon="light_mode"
            yu-text="Light"
            @click="setColorScheme('light')"
          />
          <YuButton
            yu-color="tonal"
            yu-icon="dark_mode"
            yu-text="Dark"
            @click="setColorScheme('dark')"
          />
        </div>
        <h2>Contrast</h2>
        <p>Current contrast: <strong>{{ contrast }}</strong></p>
        <div class="row">
          <YuButton
            yu-text="System default"
            @click="setContrast('system')"
          />
          <YuButton
            yu-color="tonal"
            yu-text="Default"
            @click="setContrast('default')"
          />
          <YuButton
            yu-color="tonal"
            yu-text="Medium"
            @click="setContrast('medium')"
          />
          <YuButton
            yu-color="tonal"
            yu-text="High"
            @click="setContrast('high')"
          />
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
        <h3>Styles</h3>
        <h4>Elevated</h4>
        <div class="button-grid">
          <YuButton
            yu-color="elevated"
            yu-text="Round"
          />
          <YuButton
            yu-color="elevated"
            yu-checkable
            checked
            yu-text="Checked"
          />
          <YuButton
            yu-color="elevated"
            yu-checkable
            yu-text="Unchecked"
          />
          <YuButton
            yu-color="elevated"
            yu-shape="square"
            yu-text="Square"
          />
          <YuButton
            yu-color="elevated"
            yu-shape="square"
            yu-checkable
            checked
            yu-text="Checked"
          />
          <YuButton
            yu-color="elevated"
            yu-shape="square"
            yu-checkable
            yu-text="Unchecked"
          />
        </div>
        <h4>Filled</h4>
        <div class="button-grid">
          <YuButton yu-text="Round" />
          <YuButton
            yu-checkable
            checked
            yu-text="Checked"
          />
          <YuButton
            yu-checkable
            yu-text="Unchecked"
          />
          <YuButton
            yu-shape="square"
            yu-text="Square"
          />
          <YuButton
            yu-shape="square"
            yu-checkable
            checked
            yu-text="Checked"
          />
          <YuButton
            yu-shape="square"
            yu-checkable
            yu-text="Unchecked"
          />
        </div>
        <h4>Tonal</h4>
        <div class="button-grid">
          <YuButton
            yu-color="tonal"
            yu-text="Round"
          />
          <YuButton
            yu-color="tonal"
            yu-checkable
            checked
            yu-text="Checked"
          />
          <YuButton
            yu-color="tonal"
            yu-checkable
            yu-text="Unchecked"
          />
          <YuButton
            yu-color="tonal"
            yu-shape="square"
            yu-text="Square"
          />
          <YuButton
            yu-color="tonal"
            yu-shape="square"
            yu-checkable
            checked
            yu-text="Checked"
          />
          <YuButton
            yu-color="tonal"
            yu-shape="square"
            yu-checkable
            yu-text="Unchecked"
          />
        </div>
        <h4>Outlined</h4>
        <div class="button-grid">
          <YuButton
            yu-color="outlined"
            yu-text="Round"
          />
          <YuButton
            yu-color="outlined"
            yu-checkable
            checked
            yu-text="Checked"
          />
          <YuButton
            yu-color="outlined"
            yu-checkable
            yu-text="Unchecked"
          />
          <YuButton
            yu-color="outlined"
            yu-shape="square"
            yu-text="Square"
          />
          <YuButton
            yu-color="outlined"
            yu-shape="square"
            yu-checkable
            checked
            yu-text="Checked"
          />
          <YuButton
            yu-color="outlined"
            yu-shape="square"
            yu-checkable
            yu-text="Unchecked"
          />
        </div>
        <h4>Text</h4>
        <div class="text-button-grid">
          <YuButton
            yu-color="text"
            yu-text="Round"
          />
          <YuButton
            yu-color="text"
            yu-shape="square"
            yu-text="Square"
          />
        </div>
        <h3>Sizes</h3>
        <div class="row">
          <YuButton
            yu-size="xsmall"
            yu-text="Extra small"
          />
          <YuButton yu-text="Small" />
          <YuButton
            yu-size="medium"
            yu-text="Medium"
          />
          <YuButton
            yu-size="large"
            yu-text="Large"
          />
          <YuButton
            yu-size="xlarge"
            yu-text="Extra large"
          />
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
import { useMaterialYu } from '#imports'

const { theme, contrast, setColorScheme, setContrast } = useMaterialYu()
</script>

<style lang="scss">
@use '@material-yu/styles/typescales';

:root {
  --md-ref-typeface-brand: 'Roboto Flex';
}
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
.button-grid {
  display: grid;
  grid-template-columns: repeat(3, min-content);
  gap: 1rem;
  align-items: center;
  justify-items: center;
}
.text-button-grid {
  display: grid;
  grid-template-columns: min-content;
  gap: 1rem;
  align-items: center;
  justify-items: center;
}
h1 {
  @include typescales.baseline('display', 'large');
}
h2 {
  @include typescales.baseline('headline', 'large');
}
h3 {
  @include typescales.baseline('headline', 'medium');
}
h4 {
  @include typescales.baseline('headline', 'small');
}
p {
  @include typescales.baseline('body', 'large');
}
strong {
  font-weight: 600;
}
</style>
