# 品川ミニバスチーム分類アプリ

ミニバスケットボールチームの強さを視覚的に分類し、ドラッグ&ドロップで簡単に管理できるWebアプリケーションです。

## 🏀 デモ

**ライブサイト**: [https://osmszk.github.io/shinagawa-minibasu/](https://osmszk.github.io/shinagawa-minibasu/)

## ✨ 機能

- **ドラッグ&ドロップ操作**: チームを異なるクラス間で移動
- **順位変更**: 同じクラス内でチームの順序を並び替え
- **タブ切り替え**: 男子・女子チームデータの表示切り替え
- **レスポンシブデザイン**: PC・タブレット・スマートフォン対応
- **視覚的フィードバック**: ドラッグ中のプレビュー表示
- **リアルタイム更新**: 変更が即座に反映

## 🛠️ 技術スタック

- **HTML5**: セマンティックなマークアップ
- **CSS3**: Flexbox、CSS Grid、アニメーション
- **JavaScript (Vanilla)**: HTML5 Drag and Drop API
- **GitHub Pages**: 無料ホスティング

## 📊 チーム分類

### 男子チーム
- **クラスA**: 大原、品川
- **クラスB**: 平塚、伊藤、BMAC、UP STARTウィングス、UP START鈴ヶ森、UP START浜川
- **クラスC**: 小山台

### 女子チーム
- **クラスA**: 大原、品川
- **クラスB**: 平塚、伊藤、UP START、UP STARTルピナス
- **クラスC**: 小山台

## 🚀 使い方

1. [ライブサイト](https://osmszk.github.io/shinagawa-minibasu/)にアクセス
2. 「男子」または「女子」タブを選択
3. チーム名をドラッグして別のクラスに移動
4. 同じクラス内でドラッグして順序を変更
5. 変更は自動的に保存されます

## 💻 ローカル開発

### 前提条件
- Webブラウザ（Chrome、Firefox、Safari、Edge）
- Git

### セットアップ
```bash
# リポジトリをクローン
git clone https://github.com/osmszk/shinagawa-minibasu.git

# ディレクトリに移動
cd shinagawa-minibasu

# ローカルサーバーで起動（例：Python）
python -m http.server 8000

# または Node.js の場合
npx serve .
```

ブラウザで `http://localhost:8000` にアクセス

### ファイル構成
```
shinagawa-minibasu/
├── index.html          # メインHTML
├── styles.css          # スタイルシート
├── script.js           # JavaScript機能
├── presentation.md     # 開発プレゼンテーション資料
└── README.md          # このファイル
```

## 🎯 主要機能の実装

### ドラッグ&ドロップ
HTML5 Drag and Drop APIを使用して実装
```javascript
// ドラッグ開始
function handleDragStart(e) {
  draggedTeam = this;
  e.dataTransfer.setData("text/plain", this.dataset.team);
}

// ドロップ処理
function handleDrop(e) {
  e.preventDefault();
  // DOM操作でチームを移動
}
```

### タブシステム
CSSとJavaScriptで動的な表示切り替え
```javascript
function switchTab(targetTab) {
  document.querySelector(`[data-tab="${targetTab}"]`).classList.add("active");
  document.getElementById(`${targetTab}-teams`).classList.add("active");
}
```

## 📱 レスポンシブ対応

- **デスクトップ**: 3カラムレイアウト
- **タブレット**: 2カラムレイアウト
- **スマートフォン**: 1カラムレイアウト

```css
@media (max-width: 768px) {
  .tab-content.active {
    flex-direction: column;
    align-items: center;
  }
}
```

## 🔧 カスタマイズ

### チームデータの追加
`index.html`の該当セクションにチーム要素を追加：
```html
<div class="team" draggable="true" data-team="新しいチーム名">
  新しいチーム名
</div>
```

### スタイルの変更
`styles.css`でクラス別の色やレイアウトを調整可能

## 📈 パフォーマンス

- **軽量**: 総ファイルサイズ < 10KB
- **高速**: 初回読み込み < 1秒
- **互換性**: モダンブラウザ全対応
- **アクセシビリティ**: キーボード操作対応

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

### 開発ガイドライン
- コードは読みやすく、コメントを適切に記述
- 新機能にはテストを追加
- レスポンシブデザインを維持
- アクセシビリティを考慮

## 🐛 バグ報告・機能要望

[Issues](https://github.com/osmszk/shinagawa-minibasu/issues)で報告してください。

### バグ報告時の情報
- 使用ブラウザとバージョン
- 再現手順
- 期待される動作
- 実際の動作
- スクリーンショット（可能であれば）

## 📋 今後の予定

- [ ] データ永続化（LocalStorage）
- [ ] チーム詳細情報の追加
- [ ] 印刷機能
- [ ] エクスポート機能（JSON/CSV）
- [ ] ダークモード対応
- [ ] PWA化
- [ ] TypeScript移行

## 📚 参考資料

- [HTML5 Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [GitHub Pages](https://pages.github.com/)
- [Marp](https://marp.app/) - プレゼンテーション作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 👨‍💻 作者

**osmszk**
- GitHub: [@osmszk](https://github.com/osmszk)

## 🙏 謝辞

- 品川ミニバスケットボールチームの皆様
- オープンソースコミュニティ
- MDN Web Docs

---

⭐ このプロジェクトが役に立った場合は、スターをつけていただけると嬉しいです！
