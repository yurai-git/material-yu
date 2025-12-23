<template>
  <YuLayout>
    <template #body>
      <YuPane>
        <h1>Material Yu playground</h1>
        <h2>Appearance and accessibility</h2>
        <h3>Theme</h3>
        <p>Chosen theme: <strong>{{ selectedTheme }}</strong></p>
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
        <p>Chosen contrast: <strong>{{ selectedContrast }}</strong></p>
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
        <p>Chosen motion preference: <strong>{{ selectedReducedMotion }}</strong></p>
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
        <p>Chosen transparency preference: <strong>{{ selectedReducedTransparency }}</strong></p>
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
          <YuIcon yu-icon-name="settings" />
          <!-- Using a unicode code point -->
          <YuIcon yu-icon-name="&#xe834;" />
          <!-- Using an SVG child element -->
          <YuIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path d="M10 40V24H4L24 6l10 8.85V9h4v9.55L44 24h-6v16H26.5V28h-5v12Zm3-3h5.5V25h11v12H35V19.95l-11-10-11 10Zm5.5-12h11-11Zm1.25-5.5h8.5q0-1.65-1.275-2.725Q25.7 15.7 24 15.7q-1.7 0-2.975 1.075Q19.75 17.85 19.75 19.5Z" />
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
            yu-text="Toggle"
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
            yu-text="Toggle"
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
            yu-text="Toggle"
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
            yu-text="Toggle"
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
            yu-text="Toggle"
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
            yu-text="Toggle"
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
            yu-text="Toggle"
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
            yu-text="Toggle"
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

<script setup lang="ts">
const { selectedTheme, currentTheme, setTheme } = useTheme()
const { selectedContrast, currentContrast, setContrast } = useContrast()
const { selectedReducedMotion, currentReducedMotion, setReducedMotion } = useReducedMotion()
const { selectedReducedTransparency, currentReducedTransparency, setReducedTransparency } = useReducedTransparency()
</script>

<style lang="scss">
@use '@material-yu/typescales';
@import 'https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wdth,wght@6..144,100..125,400..900&display=swap';

:root {
  $wide-weight: 900;
  $wide-wdth: 125%;
  --md-sys-typescale-emphasized-display-large-weight: #{$wide-weight};
  --md-sys-typescale-emphasized-display-large-wdth: #{$wide-wdth};
  --md-sys-typescale-emphasized-display-medium-weight: #{$wide-weight};
  --md-sys-typescale-emphasized-display-medium-wdth: #{$wide-wdth};
  --md-sys-typescale-emphasized-display-small-weight: #{$wide-weight};
  --md-sys-typescale-emphasized-display-small-wdth: #{$wide-wdth};
  --md-sys-typescale-emphasized-headline-large-weight: #{$wide-weight};
  --md-sys-typescale-emphasized-headline-large-wdth: #{$wide-wdth};
  --md-sys-typescale-emphasized-headline-medium-weight: #{$wide-weight};
  --md-sys-typescale-emphasized-headline-medium-wdth: #{$wide-wdth};
  --md-sys-typescale-emphasized-headline-small-weight: #{$wide-weight};
  --md-sys-typescale-emphasized-headline-small-wdth: #{$wide-wdth};
  --md-sys-typescale-emphasized-title-large-weight: #{$wide-weight};
  --md-sys-typescale-emphasized-title-large-wdth: #{$wide-wdth};
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
  margin-block: 1rem;
}
.button-grid, .text-button-grid {
  display: grid;
  grid-template-columns: repeat(2, min-content);
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
  @include typescales.emphasized('display', 'large');
  margin: 0;
}
h2 {
  @include typescales.emphasized('headline', 'large');
}
h3 {
  @include typescales.emphasized('headline', 'medium');
}
h4 {
  @include typescales.emphasized('headline', 'small');
}
h5, h6 {
  @include typescales.emphasized('title', 'large');
}
h2, h4, h5, h6 {
  margin: 32px 0;
}
h3 {
  margin: 16px 0;
}
p {
  @include typescales.baseline('body', 'large');
  margin-block: 1rem;

  strong {
    font-weight: 600;
  }
}
</style>
