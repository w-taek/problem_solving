import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    // ▼▼▼ 여기서부터 복사해서 붙여넣으세요 ▼▼▼
    Component.Comments({
      provider: 'giscus',
      options: {
        // 1. 저장소 정보 (주신 스크립트 내용 그대로 적용)
        repo: 'w-taek/problem_solving',
        repoId: 'R_kgDORN5uzA',
        
        // 2. 카테고리 정보
        category: 'Announcements',
        categoryId: 'DIC_kwDORN5uzM4C2WgT',
        
        // 3. ★ 핵심 매핑 설정 (여기가 제일 중요합니다!)
        // Giscus 스크립트의 data-mapping="specific" 에 해당
        mapping: 'specific', 
        
        // Giscus 스크립트의 data-term="id" 에 해당 (Frontmatter의 id 값 사용)
        term: 'id',
        
        // 4. 기타 UI 설정 (스크립트의 나머지 옵션들)
        strict: false,          // data-strict="0"
        reactionsEnabled: true, // data-reactions-enabled="1"
        inputPosition: 'top',   // data-input-position="top"
      }
    }),
    // ▲▲▲ 여기까지 ▲▲▲
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
