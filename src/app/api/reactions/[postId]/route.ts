import { NextResponse } from "next/server";
import { reactionLabels, type ReactionKey } from "@/data/mock-posts";
import { getSupabaseAdmin, type ReactionRow } from "@/lib/supabase";

type Params = {
  params: Promise<{
    postId: string;
  }>;
};

const allowedReactions = new Set(Object.keys(reactionLabels));

function formatCounts(rows: ReactionRow[]) {
  return rows.reduce<Record<string, number>>((counts, row) => {
    counts[row.reaction] = row.count;
    return counts;
  }, {});
}

export async function GET(_request: Request, { params }: Params) {
  const { postId } = await params;
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json({ counts: null, configured: false });
  }

  const { data, error } = await supabase
    .from("reactions")
    .select("post_id,reaction,count")
    .eq("post_id", postId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ counts: formatCounts(data ?? []), configured: true });
}

export async function POST(request: Request, { params }: Params) {
  const { postId } = await params;
  const body = (await request.json().catch(() => null)) as { reaction?: ReactionKey } | null;
  const reaction = body?.reaction;

  if (!reaction || !allowedReactions.has(reaction)) {
    return NextResponse.json({ error: "Unsupported reaction." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured for persistent reactions." },
      { status: 503 }
    );
  }

  const { data, error } = await supabase.rpc("increment_reaction", {
    target_post_id: postId,
    target_reaction: reaction
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const row = Array.isArray(data) ? data[0] : data;
  return NextResponse.json({ reaction, count: row?.count ?? 1 });
}
