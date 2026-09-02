<script lang="ts" setup>
defineProps<{
  art: string;
  badge?: string;
  subtitle: string;
  tone: string;
}>();
</script>

<template>
  <div
    class="cover"
    :style="{ background: `linear-gradient(145deg, ${tone}, #ffffff 76%)` }"
  >
    <span class="cover-pin"></span>
    <span class="cover-sun"></span>
    <p>精选{{ art }}</p>
    <strong>核心英文句型</strong>
    <small>{{ subtitle }}</small>
    <div class="characters">
      <i></i>
      <i></i>
      <i></i>
    </div>
    <em v-if="badge">{{ badge }}</em>
  </div>
</template>

<style scoped>
.cover {
  position: relative;
  height: 228px;
  padding-top: 28px;
  overflow: hidden;
  text-align: center;
  border: 1px solid rgb(0 0 0 / 5%);
  border-radius: 6px;
}

.cover::before {
  position: absolute;
  inset: 10px;
  pointer-events: none;
  content: '';
  border: 2px solid rgb(255 255 255 / 55%);
  border-radius: 4px;
}

.cover p,
.cover strong,
.cover small {
  position: relative;
  z-index: 1;
  display: block;
}

.cover p {
  margin: 2px 6px;
  font-size: 22px;
  font-weight: 800;
  color: #0c5361;
  text-shadow: 1px 1px rgb(255 255 255 / 80%);
}

.cover strong {
  font-size: 18px;
  color: #173a47;
  letter-spacing: 0.5px;
}

.cover small {
  margin-top: 4px;
  font-weight: 700;
  color: #ae793a;
}

.cover-pin,
.cover-sun {
  position: absolute;
  top: 11px;
  left: 15px;
  width: 12px;
  height: 12px;
  background: #f0c951;
  border-radius: 50%;
}

.cover-sun {
  top: 7px;
  right: 15px;
  left: auto;
  width: 10px;
  height: 10px;
  background: #e68783;
}

.characters {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  gap: 2px;
  align-items: end;
  justify-content: center;
  height: 95px;
  background: linear-gradient(transparent, rgb(73 139 100 / 15%));
}

.characters i {
  width: 43px;
  height: 62px;
  background: #8a5537;
  border: 9px solid #ffd7b7;
  border-bottom-width: 20px;
  border-radius: 48% 48% 30% 30%;
}

.characters i:nth-child(2) {
  height: 76px;
  background: #50352d;
}

.characters i:nth-child(3) {
  background: #74422d;
}

.cover em {
  position: absolute;
  right: 5px;
  bottom: 4px;
  z-index: 2;
  padding: 2px 5px;
  font-size: 11px;
  font-style: normal;
  color: #fff;
  background: rgb(41 41 41 / 55%);
  border-radius: 2px;
}
</style>
