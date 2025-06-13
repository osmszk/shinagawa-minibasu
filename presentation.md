---
marp: true
theme: default
paginate: true
header: '品川ミニバスチーム分類アプリ開発'
footer: '社内勉強会 - Web開発事例紹介'
---

# 品川ミニバスチーム分類アプリ開発
## HTML/CSS/JavaScript を使った実践的Web開発事例

**開発期間**: 約1時間
**技術スタック**: HTML5, CSS3, JavaScript (Vanilla)
**デプロイ**: GitHub Pages

---

## プロジェクト概要

### 要件
- ミニバスチームの強さをクラス（A, B, C）で分類
- ドラッグ&ドロップでチーム移動・順位変更
- 男子・女子データの切り替え表示
- 友達と共有できるWebアプリ

### 目標
- **使いやすさ**: 直感的なUI/UX
- **機能性**: 実用的なドラッグ&ドロップ
- **拡張性**: 新しいデータの追加が容易

---

## 技術選択の理由

### なぜVanilla JavaScript？
- **学習コストが低い**: フレームワーク不要
- **軽量**: 高速な読み込み
- **シンプル**: 複雑な依存関係なし

### なぜGitHub Pages？
- **無料**: コスト0円でホスティング
- **簡単**: Git pushで自動デプロイ
- **信頼性**: GitHubのインフラを利用

---

## 開発プロセス - Phase 1: 基本構造

### 1. HTML構造の設計
```html
<div class="class-container">
  <h2>クラスA</h2>
  <div class="teams-list" data-class="A">
    <div class="team" draggable="true">チーム名</div>
  </div>
</div>
```

### ポイント
- セマンティックなHTML
- `data-*` 属性でメタデータ管理
- `draggable="true"` でドラッグ可能に

---

## 開発プロセス - Phase 2: スタイリング

### CSS設計のポイント
```css
.team {
  cursor: grab;
  transition: all 0.2s ease;
}

.team:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.team.dragging {
  opacity: 0.5;
  transform: scale(1.02);
}
```

### 視覚的フィードバック
- ホバー効果で操作可能性を示唆
- ドラッグ中の視覚的変化
- クラス別の色分け

---

## 開発プロセス - Phase 3: ドラッグ&ドロップ実装

### HTML5 Drag and Drop API活用
```javascript
// ドラッグ開始
function handleDragStart(e) {
  draggedTeam = this;
  e.dataTransfer.setData("text/plain", this.dataset.team);
  this.classList.add("dragging");
}

// ドロップ処理
function handleDrop(e) {
  e.preventDefault();
  // 位置計算とDOM操作
  this.appendChild(draggedTeam);
}
```

---

## 技術的チャレンジ 1: ドロップ位置の計算

### 問題
- どの位置にドロップするかの判定が複雑

### 解決策
```javascript
function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".team:not(.dragging)")
  ];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
```

---

## 技術的チャレンジ 2: 視覚的フィードバック

### 問題
- ユーザーがドロップ位置を把握しにくい

### 解決策: プレースホルダー表示
```javascript
// ドラッグ中にプレースホルダーを表示
draggedTeamPlaceholder = document.createElement("div");
draggedTeamPlaceholder.style.height = "2px";
draggedTeamPlaceholder.style.backgroundColor = "#3498db";

if (afterElement == null) {
  this.appendChild(draggedTeamPlaceholder);
} else {
  this.insertBefore(draggedTeamPlaceholder, afterElement);
}
```

---

## 開発プロセス - Phase 4: タブシステム追加

### 要件変更への対応
- 男子データに加えて女子データも管理したい
- タブで切り替えられるUI

### 実装アプローチ
```javascript
function switchTab(targetTab) {
  // 全てのタブを非アクティブに
  tabButtons.forEach(btn => btn.classList.remove("active"));
  tabContents.forEach(content => content.classList.remove("active"));

  // 選択されたタブをアクティブに
  document.querySelector(`[data-tab="${targetTab}"]`).classList.add("active");
  document.getElementById(`${targetTab}-teams`).classList.add("active");
}
```

---

## CSS設計: タブシステム

### アクティブ状態の管理
```css
.tab-button {
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
}

.tab-button.active {
  color: #3498db;
  border-bottom-color: #3498db;
  background-color: rgba(52, 152, 219, 0.1);
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: flex;
}
```

---

## レスポンシブデザイン対応

### モバイルファースト設計
```css
@media (max-width: 768px) {
  .tab-content.active {
    flex-direction: column;
    align-items: center;
  }

  .tab-button {
    padding: 10px 20px;
    font-size: 14px;
  }

  .class-container {
    margin-bottom: 20px;
  }
}
```

### ポイント
- タッチデバイスでの操作性を考慮
- 画面サイズに応じたレイアウト調整

---

## デプロイメント: GitHub Pages

### 手順
1. **リポジトリ作成**
   ```bash
   gh repo create shinagawa-minibasu --public --source=. --push
   ```

2. **GitHub Pages設定**
   - Settings → Pages
   - Source: Deploy from branch (main)

3. **自動デプロイ**
   - `git push` で自動更新
   - 数分でライブサイトに反映

---

## 最終成果物

### 機能一覧
✅ **ドラッグ&ドロップ**: チーム移動・順位変更
✅ **タブ切り替え**: 男子・女子データ表示
✅ **レスポンシブ**: PC・モバイル対応
✅ **視覚的フィードバック**: 直感的な操作感
✅ **データ管理**: 簡単な追加・編集

### パフォーマンス
- **軽量**: 総ファイルサイズ < 10KB
- **高速**: 初回読み込み < 1秒
- **互換性**: モダンブラウザ全対応

---

## 学んだこと・気づき

### 技術面
- **Vanilla JavaScriptの威力**: フレームワーク不要でも十分
- **HTML5 APIの活用**: ドラッグ&ドロップが標準で利用可能
- **CSS Transitionの効果**: 小さなアニメーションでUX向上

### 開発プロセス
- **段階的開発**: 機能を小さく分けて実装
- **ユーザーフィードバック**: 実際の使用場面を想定
- **継続的改善**: 要件変更への柔軟な対応

---

## 今後の拡張可能性

### 機能追加案
- **データ永続化**: LocalStorage/サーバー保存
- **チーム詳細情報**: 選手名、成績など
- **印刷機能**: PDF出力対応
- **共有機能**: URL共有、SNS連携

### 技術的改善
- **TypeScript化**: 型安全性の向上
- **テスト追加**: 自動テストの導入
- **PWA化**: オフライン対応

---

## まとめ

### プロジェクトの成功要因
1. **明確な要件定義**: 何を作るかが明確
2. **適切な技術選択**: 要件に最適な技術スタック
3. **段階的開発**: 小さく始めて徐々に拡張
4. **ユーザー中心設計**: 使いやすさを最優先

### 開発時間: 約1時間
- 基本実装: 30分
- タブシステム追加: 20分
- デプロイ・調整: 10分

**シンプルでも価値のあるアプリケーションは短時間で作れる！**

---

## Q&A

### よくある質問

**Q: なぜReactやVueを使わなかったのか？**
A: 要件がシンプルで、学習コストと開発速度を重視したため

**Q: データベースは必要ないのか？**
A: 現在の要件では不要。将来的にはLocalStorageやFirebaseを検討

**Q: セキュリティ対策は？**
A: 静的サイトのため最小限。将来的にはCSP等を検討

---

## 参考資料・リンク

### 完成品
- **ライブサイト**: https://osmszk.github.io/shinagawa-minibasu/
- **ソースコード**: https://github.com/osmszk/shinagawa-minibasu

### 技術ドキュメント
- [HTML5 Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [GitHub Pages](https://pages.github.com/)

**ご質問・ご意見をお聞かせください！**
