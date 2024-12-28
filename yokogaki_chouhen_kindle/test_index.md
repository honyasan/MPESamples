---
title: "チートシート"
author:
  - "サンプルマン"
date: "December 25, 2024"
subtitle: "markdownのテスト"
lang: "ja-JP"
dir: "ltr"
cover-image: cover.jpg
link:
  - rel: stylesheet
    href: .crossnote/style.less
html:
  print_background: true
  embed_local_images: true
  embed_svg: true
  offline: true
puppeteer:
  format: "A5"
  landscape: false
  margin:
    top: 9.6mm
    right: 0mm  
    bottom: 9.6mm
    left: 0mm
output:
  custom_document:
    path: "test.epub"
    pandoc_args: [
      "--css=.crossnote/style.less",
      "--highlight-style=tango",
      "--mathml",
      "--standalone"
    ]
---
# チートシート{ignore=true .noPageBreak}

## はじめに{ignore=true .noPageBreak}

このドキュメントはVSCode×MPE×Pandocで、html(offline)形式・Chrome(puppeteer) PDF形式・Pandoc EPUB形式に出力するマークダウンを書くためのスタイルを適用したチートシートです。

本文各行はKindle Previewerが許可するEPUB形式に出力できないものもあるので記載内容に注意してください。

## 目次{ignore=true .noPageBreak}

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=4 orderedList=false} -->

<!-- code_chunk_output -->

- [マークダウンの見出しサンプル](#マークダウンの見出しサンプル)
  - [H3の見出し・１つ目](#h3の見出し1つ目)
    - [H4の見出し・１つ目](#h4の見出し1つ目)
    - [H4の見出し・２つ目](#h4の見出し2つ目)
  - [H3の見出し・２つ目](#h3の見出し2つ目)
    - [H4の見出し・３つ目](#h4の見出し3つ目)
    - [H4の見出し・４つ目](#h4の見出し4つ目)
- [マークダウンの各サンプル](#マークダウンの各サンプル)
  - [強調](#強調)
  - [リスト](#リスト)
  - [タスクリスト](#タスクリスト)
  - [図・画像](#図画像)
  - [図・画像の回り込み](#図画像の回り込み)
  - [リンク](#リンク)
  - [引用](#引用)
  - [水平線](#水平線)
  - [インラインコード](#インラインコード)
  - [コードブロック](#コードブロック)
  - [表](#表)
  - [絵文字](#絵文字)
  - [上付き・下付き文字](#上付き下付き文字)
  - [脚注](#脚注)
  - [マーク](#マーク)
  - [数式](#数式)
  - [ルビ](#ルビ)
  - [Admonition](#admonition)

<!-- /code_chunk_output -->

@import "test_chapter1.md"
@import "test_chapter2.md"
@import "test_chapter99.md"
