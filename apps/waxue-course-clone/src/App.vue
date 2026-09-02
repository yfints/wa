<script setup lang="ts">
import { computed, ref } from 'vue';

import { Button, Input, Modal } from 'ant-design-vue';

type Course = { title: string; heat: number; art: string; tone: string };

const categories = ['全部', '零基础', '日常实用', '综合提升', '商务英语', '认证备考', '娱乐影音', '分级阅读', '词汇学习', '行业英语', '文学读物', '英文演讲', '其他'];
const nav = ['首页', '课程广场', '教材同步', '单词仓库', '音标课程', 'AI 对话', 'PK竞技场', '学习计划', '学习手账', '我的收藏', '排行榜', 'AI创课坊', '合伙人计划', '学社主理人', '开通学习卡', '推广奖励', '设置'];
const courseData = [
  ['零基础日常口语表达900句', '900', '#b9e8d6'], ['精选720组核心英文句型 少儿六上段', '720', '#e4c7a1'], ['精选720组核心英文句型 少儿六下段', '720', '#f3ba8b'], ['精选600组核心英文句型 少儿五上段', '600', '#b9d8f4'], ['精选600组核心英文句型 少儿五下段', '600', '#d7b37b'], ['精选450组核心英文句型 少儿四上段', '450', '#93d2e4'], ['精选450组核心英文句型 少儿四下段', '450', '#ecd19c'], ['精选300组核心英文句型 少儿三上段', '300', '#bee3c1'], ['精选300组核心英文句型 少儿三下段', '300', '#d6b587'], ['零基础学英语（认识动物、星期、水果...）', 'ABC', '#f0ca5c'], ['26个英文字母', 'A B C', '#f3dfa0'], ['语法渐进式突破', 'GRAMMAR', '#e4e6dd'], ['零基础英语生活常用表达', 'SPEAK', '#b6dbbd'], ['Reading for Vocabulary-Level A', 'READ', '#abd9e9'], ['生活场景常用简单表达', '生活场景', '#e6b9bc'], ['万用亲子英文（第一册）', '8000句', '#dc8cb6'], ['万用亲子英文（第二册）', '8000句', '#da8aaf'], ['万用亲子英文（第三册）', '8000句', '#e3ad90'], ['母女英语口语', '母女英语', '#bbd4e8'], ['亲子英语口语2000句', '2000句', '#ebd1ac'], ['实用口语：生活场景90个', '90个', '#c08c70'], ['简单有趣的地道美语表达', 'AMERICAN', '#9cbaba'], ['美剧口语句子', 'MOVIE', '#d5bd94'], ['机场英语口语', 'AIRPORT', '#b7d1e5']
];
const courses: Course[] = courseData.map(([title, art, tone], index) => ({ title, art, tone, heat: 8220 - index * 128 }));
const active = ref('全部');
const query = ref('');
const showLogin = ref(true);
const isTeach = window.location.pathname.startsWith('/teachMall');
const stage = ref('小学');
const version = ref('人教版PEP（三年级起点）');
const grade = ref('三年级');
const stages = ['小学', '初中', '小学(五-四学制)', '初中(五-四学制)', '高中', '大学', '特殊教育', '其他'];
const versions = ['人教版PEP（三年级起点）', '人教版（一年级起点）', '人教大同版', '人教版（精通）', '冀教版（一年级起点）', '冀教版（三年级起点）', '湘少版', '教科版（EEC学院）', '教科版（广州）', '接力版', '科普版', '辽宁师大版', '清华大学版', '鲁教湘教版', '陕旅版', '沪教版', '川教版', '外研社版（新标准一起）', '外研社版(新标准三起) 陈主编', '外研社版(新交际) 桂主编', '外研版(Join In) 刘主编', '译林版', '粤教沪外教版', '北师大版（三起）', '重庆大学版', '北京版', '闽教版', '粤教粤人版', '（外研社）孙主编', '（外研社）张主编', '北师大版（一起）', '剑桥版 join', '牛津上海版', 'HEAD START'];
const grades = ['三年级', '四年级', '五年级', '六年级'];
const books = ['(新课标) 三年级上册人教版PEP', '(新课标) 三年级下册人教版PEP', '三年级下册 人教PEP', '三年级上册 人教PEP', '一年级下册 人教PEP'];
const visibleCourses = computed(() => courses.filter((item) => item.title.toLowerCase().includes(query.value.toLowerCase())));
const icons = ['⌂', '◈', '▣', '▤', '▧', '◎', '▦', '☑', '◫', '☆', '♧', '▧', '◇', '♙', '◈', '⌘', '⚙'];
</script>

<template>
  <main v-if="isTeach" class="teach-shell">
    <aside class="teach-sidebar">
      <div class="teach-brand"><span>▱</span><b>哇小舍<sup>9884</sup></b><small>学习副本</small></div>
      <nav>
        <button v-for="(item, index) in nav" :key="item" :class="['teach-nav', { active: item === '教材同步' }]"><span>{{ icons[index] }}</span>{{ item }}</button>
      </nav>
    </aside>
    <section class="teach-main">
      <header class="teach-topbar">
        <div class="teach-crumb">▣　教材同步</div>
        <div class="teach-search">
          <Input :bordered="false" placeholder="搜索你想要的课程">
            <template #prefix><span>⌕</span></template>
          </Input>
        </div>
        <div class="teach-quick">
          <Button>◌ 微信群</Button><Button>▣ 添加桌面</Button><Button>♧ 客服咨询</Button><Button>☆ 关注我们</Button><Button>▤ 建议反馈</Button><Button>♧ 系统消息</Button><span>▱</span>
        </div>
      </header>
      <div class="stage-tabs">
        <Button v-for="item in stages" :key="item" type="text" :class="{ selected: stage === item }" @click="stage = item">{{ item }}</Button>
      </div>
      <section class="teach-filters">
        <div class="filter-row"><b>版本</b><div>
          <Button v-for="item in versions" :key="item" type="text" :class="{ selected: version === item }" @click="version = item">{{ item }}</Button>
        </div></div>
        <div class="filter-row"><b>年级</b><div>
          <Button v-for="item in grades" :key="item" type="text" :class="{ selected: grade === item }" @click="grade = item">{{ item }}</Button>
        </div></div>
      </section>
      <section class="book-grid">
        <article v-for="(book, index) in books" :key="book" class="book-card">
          <div :class="['book-cover', { sky: index < 2 }]">
            <template v-if="index < 2"><strong>三年级{{ index === 0 ? '上' : '下' }}册英语</strong><small>（新课标）<br />人教版 PEP</small><div class="school">▥</div></template>
            <template v-else><strong>{{ index === 4 ? '一年级上册' : index === 2 ? '三年级下册' : '三年级上册' }}</strong><small>（人教版PEP）</small><div class="kids"><i></i><i></i><i></i></div></template>
          </div>
          <p>{{ book }}</p>
        </article>
      </section>
      <footer class="teach-footer">内容均由平台用户独立创作，教材版本及名称仅用于分类整理；如涉及侵权，请联系：waxueshe@163.com</footer>
    </section>
  </main>

  <main v-else class="app-shell">
    <aside class="sidebar">
      <div class="brand"><span class="brand-mark">▱</span><b>哇学社</b><sup>®</sup></div>
      <nav>
        <button v-for="(item, index) in nav" :key="item" :class="['nav-item', { active: item === '课程广场' }]">
          <span>{{ icons[index] }}</span>{{ item }}
        </button>
      </nav>
    </aside>

    <section class="content">
      <header class="topbar">
        <div class="crumb"><span>▣</span> 课程广场</div>
        <div class="search">
          <Input v-model:value="query" :bordered="false" allow-clear placeholder="搜索你想要的课程">
            <template #prefix><span>⌕</span></template>
          </Input>
        </div>
        <div class="quick-links">
          <Button>◌ 微信群</Button><Button>♧ 客服咨询</Button><Button>☆ 关注我们</Button><Button>▤ 建议反馈</Button><Button>♧ 系统消息</Button><span class="mini-logo">▱</span>
        </div>
      </header>

      <section class="filters">
        <Button v-for="item in categories" :key="item" type="text" :class="{ selected: active === item }" @click="active = item">{{ item }}</Button>
        <a href="#more">▣ 想要更多课程？</a>
      </section>

      <section class="grid">
        <article v-for="(course, index) in visibleCourses" :key="course.title" class="course-card" @click="showLogin = true">
          <div class="cover" :style="{ background: `linear-gradient(145deg, ${course.tone}, #ffffff 76%)` }">
            <div class="cover-pin"></div><div class="cover-sun"></div>
            <p>精选{{ course.art }}</p><strong>核心英文句型</strong><small>{{ index % 3 === 0 ? '少儿上段英语语调' : '日常英语轻松学习' }}</small>
            <div class="characters"><i></i><i></i><i></i></div><em>用户共享</em>
          </div>
          <h3>{{ course.title }}</h3>
          <footer><span class="purple-dot"></span><span class="author">.</span><span class="heat">♨ {{ course.heat }}</span></footer>
        </article>
      </section>
    </section>

    <Modal v-model:open="showLogin" class="login-modal" :footer="null" :mask-closable="false" :width="420" title="提示" centered>
      <p class="login-tip"><span class="warning">!</span> 您还未登录或登录失效，是否前往登录？</p>
      <div class="modal-actions">
        <Button @click="showLogin = false">先不登录</Button>
        <Button class="confirm" type="primary" @click="showLogin = false">确认</Button>
      </div>
    </Modal>
  </main>
</template>
