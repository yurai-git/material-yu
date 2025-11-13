<template>
  <YuLayout>
    <template #body>
      <YuPane>
        <h1>Material Yu playground</h1>
        <h2>Appearance and accessibility</h2>
        <h3>Theme</h3>
        <p>Chosen theme: <strong>{{ theme }}</strong></p>
        <p>Current theme: <strong>{{ currentTheme }}</strong></p>
        <div class="row">
          <YuButton
            yu-icon="routine"
            yu-text="System default"
            @click="setTheme('system')"
          />
          <YuButton
            yu-color="tonal"
            yu-icon="light_mode"
            yu-text="Light"
            @click="setTheme('light')"
          />
          <YuButton
            yu-color="tonal"
            yu-icon="dark_mode"
            yu-text="Dark"
            @click="setTheme('dark')"
          />
        </div>
        <h3>Contrast</h3>
        <p>Chosen contrast: <strong>{{ contrast }}</strong></p>
        <p>Current contrast: <strong>{{ currentContrast }}</strong></p>
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
        <h3>Reduced motion</h3>
        <p>Chosen motion preference: <strong>{{ reducedMotion }}</strong></p>
        <p>Current motion preference: <strong>{{ currentReducedMotion }}</strong></p>
        <div class="row">
          <YuButton
            yu-text="System default"
            @click="setReducedMotion('system')"
          />
          <YuButton
            yu-color="tonal"
            yu-text="Unreduced"
            @click="setReducedMotion('unreduced')"
          />
          <YuButton
            yu-color="tonal"
            yu-text="Reduced"
            @click="setReducedMotion('reduced')"
          />
        </div>
        <h3>Reduced transparency</h3>
        <p>Chosen transparency preference: <strong>{{ reducedTransparency }}</strong></p>
        <p>Current transparency preference: <strong>{{ currentReducedTransparency }}</strong></p>
        <div class="row">
          <YuButton
            yu-text="System default"
            @click="setReducedTransparency('system')"
          />
          <YuButton
            yu-color="tonal"
            yu-text="Unreduced"
            @click="setReducedTransparency('unreduced')"
          />
          <YuButton
            yu-color="tonal"
            yu-text="Reduced"
            @click="setReducedTransparency('reduced')"
          />
        </div>
        <h2>Icons</h2>
        <div class="row">
          <!-- Using an icon name -->
          <YuIcon
            yu-icon-name="home"
            :yu-style="{
              fill: true,
            }"
          />
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
            yu-icon="edit"
          />
          <YuButton
            yu-color="elevated"
            yu-checkable
            checked
            yu-text="Selected"
            yu-icon="edit"
          />
          <YuButton
            yu-color="elevated"
            yu-checkable
            yu-text="Unselected"
            yu-icon="edit"
          />
          <YuButton
            yu-color="elevated"
            yu-shape="square"
            yu-text="Square"
            yu-icon="edit"
          />
          <YuButton
            yu-color="elevated"
            yu-shape="square"
            yu-checkable
            checked
            yu-text="Selected"
            yu-icon="edit"
          />
          <YuButton
            yu-color="elevated"
            yu-shape="square"
            yu-checkable
            yu-text="Unselected"
            yu-icon="edit"
          />
        </div>
        <h4>Filled</h4>
        <div class="button-grid">
          <YuButton
            yu-text="Round"
            yu-icon="edit"
          />
          <YuButton
            yu-checkable
            checked
            yu-text="Selected"
            yu-icon="edit"
          />
          <YuButton
            yu-checkable
            yu-text="Unselected"
            yu-icon="edit"
          />
          <YuButton
            yu-shape="square"
            yu-text="Square"
            yu-icon="edit"
          />
          <YuButton
            yu-shape="square"
            yu-checkable
            checked
            yu-text="Selected"
            yu-icon="edit"
          />
          <YuButton
            yu-shape="square"
            yu-checkable
            yu-text="Unselected"
            yu-icon="edit"
          />
        </div>
        <h4>Tonal</h4>
        <div class="button-grid">
          <YuButton
            yu-color="tonal"
            yu-text="Round"
            yu-icon="edit"
          />
          <YuButton
            yu-color="tonal"
            yu-checkable
            checked
            yu-text="Selected"
            yu-icon="edit"
          />
          <YuButton
            yu-color="tonal"
            yu-checkable
            yu-text="Unselected"
            yu-icon="edit"
          />
          <YuButton
            yu-color="tonal"
            yu-shape="square"
            yu-text="Square"
            yu-icon="edit"
          />
          <YuButton
            yu-color="tonal"
            yu-shape="square"
            yu-checkable
            checked
            yu-text="Selected"
            yu-icon="edit"
          />
          <YuButton
            yu-color="tonal"
            yu-shape="square"
            yu-checkable
            yu-text="Unselected"
            yu-icon="edit"
          />
        </div>
        <h4>Outlined</h4>
        <div class="button-grid">
          <YuButton
            yu-color="outlined"
            yu-text="Round"
            yu-icon="edit"
          />
          <YuButton
            yu-color="outlined"
            yu-checkable
            checked
            yu-text="Selected"
            yu-icon="edit"
          />
          <YuButton
            yu-color="outlined"
            yu-checkable
            yu-text="Unselected"
            yu-icon="edit"
          />
          <YuButton
            yu-color="outlined"
            yu-shape="square"
            yu-text="Square"
            yu-icon="edit"
          />
          <YuButton
            yu-color="outlined"
            yu-shape="square"
            yu-checkable
            checked
            yu-text="Selected"
            yu-icon="edit"
          />
          <YuButton
            yu-color="outlined"
            yu-shape="square"
            yu-checkable
            yu-text="Unselected"
            yu-icon="edit"
          />
        </div>
        <h4>Text</h4>
        <div class="text-button-grid">
          <YuButton
            yu-color="text"
            yu-text="Round"
            yu-icon="edit"
          />
          <YuButton
            yu-color="text"
            yu-shape="square"
            yu-text="Square"
            yu-icon="edit"
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
        <div class="row">
          <div
            tabindex="0"
            class="ripple"
          >
            <YuInteractive />
          </div>
        </div>
      </YuPane>
    </template>
  </YuLayout>
</template>

<script setup>
const { theme, currentTheme, setTheme } = useTheme()
const { contrast, currentContrast, setContrast } = useContrast()
const { reducedMotion, currentReducedMotion, setReducedMotion } = useReducedMotion()
const { reducedTransparency, currentReducedTransparency, setReducedTransparency } = useReducedTransparency()
</script>

<style lang="scss">
@use '@material-yu/typescales';
@import 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght,XTRA@8..144,150,900,600&display=swap';

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
  margin-block: 1rem;
}
.button-grid, .text-button-grid {
  display: grid;
  grid-template-columns: repeat(3, min-content);
  gap: 1rem;
  align-items: center;
  justify-items: center;
  margin-block: 1rem;

  &.text-button-grid {
    grid-template-columns: min-content;
  }
}
.ripple {
  block-size: 4rem;
  inline-size: 4rem;
  padding: 1rem;
  outline: 1px solid var(--md-sys-color-outline);
  outline-offset: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.5rem;
}
h1 {
  @include typescales.baseline('display', 'large');
  margin-block: 0 1.5rem;
}
h2 {
  @include typescales.baseline('headline', 'large');
  margin-block: 3.5rem 1rem;
}
h3 {
  @include typescales.baseline('headline', 'medium');
  margin-block: 3.5rem 1rem;
}
h4 {
  @include typescales.baseline('headline', 'small');
  margin-block: 3.5rem 1rem;
}
h5 {
  margin-block: 3.5rem 1rem;
}
h6 {
  margin-block: 3.5rem 1rem;
}
p {
  @include typescales.baseline('body', 'large');
  margin-block: 1rem;

  strong {
    @include typescales.emphasized('body', 'large');
  }
}
</style>
