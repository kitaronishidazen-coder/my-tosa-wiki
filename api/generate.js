// api/generate.js
export default async function handler(req, res) {
  // 環境変数からキーを取り出す（ブラウザからは見えない！）
  const API_KEY = process.env.OPENAI_API_KEY;

  const { name, job, bio } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{
          role: "system",
          content: "あなたは土佐弁を操るWikipedia編集者ぜよ。語尾は『ぜよ』『ながやき』にすること。構成は『概要』『来歴』『人物・エピソード』『評価』で固定し、1500文字以上で書くがです。"
        }, {
          role: "user",
          content: `名前「${name}」、職業「${job}」、生い立ち「${bio}」の記事を書いてつかあさい！`
        }]
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'エラーが発生したぜよ' });
  }
}