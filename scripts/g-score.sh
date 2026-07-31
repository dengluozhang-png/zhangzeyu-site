#!/usr/bin/env bash
# scripts/g-score.sh
# 一键给全部 writing/*.md 跑 GEO 评分
# 用法：bash scripts/g-score.sh
# 或：   bash scripts/g-score.sh --language=zh --engine=perplexity

set -euo pipefail

# 默认参数
LANGUAGE="${LANGUAGE:-zh}"
ENGINE="${ENGINE:-perplexity}"
MODEL="${MODEL:-dual}"
CONTENT_TYPE="${CONTENT_TYPE:-blog}"
THRESHOLD="${THRESHOLD:-0.5}"
G_SCORE_PATHS=(
  ".agents/skills/geo-content-optimization/scripts/g-score-estimator.py"
  "src/.agents/skills/geo-content-optimization/scripts/g-score-estimator.py"
  "$HOME/.agents/skills/geo-content-optimization/scripts/g-score-estimator.py"
)

# 顺次查找 g-score 脚本
G_SCORE=""
for p in "${G_SCORE_PATHS[@]}"; do
  if [ -f "$p" ]; then
    G_SCORE="$p"
    break
  fi
done

if [ -z "$G_SCORE" ]; then
  echo "❌ 找不到 g-score-estimator.py"
  echo "   请确认 ~/.agents/skills/geo-content-optimization/scripts/ 存在"
  exit 1
fi

echo "🎯 用 g-score 脚本: $G_SCORE"
echo "📊 参数: language=$LANGUAGE engine=$ENGINE model=$MODEL threshold=$THRESHOLD"
echo ""

# 写每次报告到一个文件
REPORT_DIR="docs/geo-reports"
mkdir -p "$REPORT_DIR"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
REPORT="$REPORT_DIR/g-score-$TIMESTAMP.md"

pass=0
fail=0
total=0

# 跑所有 writing/*.md
for file in src/content/writing/*.md; do
  [ -f "$file" ] || continue
  total=$((total + 1))
  name=$(basename "$file" .md)

  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📝 $name"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  # 抓 G-score
  output=$(python "$G_SCORE" \
    --file "$file" \
    --language "$LANGUAGE" \
    --content-type "$CONTENT_TYPE" \
    --engine "$ENGINE" \
    --model "$MODEL" \
    --format human 2>&1 || true)

  echo "$output"

  # 提取 G-score
  gscore=$(echo "$output" | grep -oE "G-score: [0-9.]+" | head -1 | grep -oE "[0-9.]+$" || echo "0")
  if [ -n "$gscore" ] && python -c "import sys; sys.exit(0 if float('$gscore') >= $THRESHOLD else 1)" 2>/dev/null; then
    pass=$((pass + 1))
    echo "✅ PASS (G-score $gscore >= $THRESHOLD)"
  else
    fail=$((fail + 1))
    echo "⚠️  BELOW THRESHOLD (G-score $gscore < $THRESHOLD)"
  fi
  echo ""

  # 写到报告
  {
    echo "## $name"
    echo ""
    echo "\`\`\`"
    echo "$output"
    echo "\`\`\`"
    echo ""
  } >> "$REPORT"
done

# 总结
{
  echo "# GEO 评分报告"
  echo ""
  echo "- 时间：$(date '+%Y-%m-%d %H:%M:%S')"
  echo "- 阈值：$THRESHOLD"
  echo "- 通过：$pass / $total"
  echo "- 失败：$fail / $total"
  echo ""
  echo "## 详细信息"
  echo ""
} >> "$REPORT"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 总览：$pass / $total 通过，$fail / $total 未达标"
echo "📄 报告已写入：$REPORT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
