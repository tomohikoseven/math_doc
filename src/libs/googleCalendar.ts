/**
 * Google Calendar API Utility and Calendar Grid Logic
 * 
 * このモジュールは、Google Calendar API から学習時間の予定を取得し、
 * 年間のヒートマップ（GitHubの草生やしカレンダー風）用のデータへ変換・集計するロジックを提供します。
 */

/** 1日あたりの学習時間データ */
export interface DailyStudyTime {
  /** 対象日 (YYYY-MM-DD形式) */
  date: string;
  /** 学習時間 (分) */
  minutes: number;
}

/** カレンダーグリッドの1マスに相当するデータ */
export interface CalendarDay {
  /** 対象日 (YYYY-MM-DD形式) */
  date: string;
  /** 学習時間 (分) */
  minutes: number;
  /** コントリビューションのレベル (0〜4) */
  level: number;
}

/** カレンダー上部に表示する月ラベルの情報 */
export interface MonthLabel {
  /** 月の名称 (Jan, Feb, ...) */
  name: string;
  /** カレンダー内での週インデックス */
  weekIndex: number;
}

/**
 * Google Calendar API から指定期間の予定を取得し、日別の学習時間（分）として集計します。
 *
 * @param apiKey - Google API キー
 * @param calendarId - 対象のカレンダーID
 * @param timeMin - 取得開始日時 (ISO 8601形式)
 * @param timeMax - 取得終了日時 (ISO 8601形式)
 * @returns 日付文字列 (YYYY-MM-DD) をキー、合計学習時間 (分) を値とするレコードオブジェクト
 * @throws APIリクエストが失敗した場合にエラーをスローします
 */
export async function fetchStudyTime(
  apiKey: string,
  calendarId: string,
  timeMin: string,
  timeMax: string
): Promise<Record<string, number>> {
  const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`);
  url.searchParams.append('key', apiKey);
  url.searchParams.append('timeMin', timeMin);
  url.searchParams.append('timeMax', timeMax);
  url.searchParams.append('singleEvents', 'true');
  url.searchParams.append('orderBy', 'startTime');

  const response = await fetch(url.toString());
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Google Calendar API Error: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  const items = data.items || [];
  
  return items.reduce((acc: Record<string, number>, item: any) => {
    const start = item.start?.dateTime || item.start?.date;
    const end = item.end?.dateTime || item.end?.date;
    
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const durationMinutes = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60));

      const dateKey = startDate.toISOString().split('T')[0];
      acc[dateKey] = (acc[dateKey] || 0) + durationMinutes;
    }
    
    return acc;
  }, {});
}

/**
 * 学習時間（分）に基づいて、ヒートマップの色の濃さを示すレベル (0〜4) を決定します。
 *
 * @param minutes - 1日の合計学習時間 (分)
 * @returns レベル (0: なし, 1: 30分以上, 2: 60分以上, 3: 120分以上, 4: 240分以上)
 */
export function getStudyLevel(minutes: number): number {
  if (minutes >= 240) return 4;
  if (minutes >= 120) return 3;
  if (minutes >= 60) return 2;
  if (minutes >= 30) return 1;
  return 0;
}

/**
 * 対象年の開始から終了までの全日数分のカレンダーデータを生成します。
 * カレンダー表示用に、最初の週の日曜日に合わせて開始日を調整します。
 *
 * @param year - 対象の年 (YYYY形式)
 * @param studyData - fetchStudyTime で取得した日別の学習時間データ
 * @returns カレンダーグリッド描画用のデータの配列
 */
export function generateCalendarData(year: number, studyData: Record<string, number>): CalendarDay[] {
  const days: CalendarDay[] = [];
  const startDate = new Date(`${year}-01-01T00:00:00Z`);
  const endDate = new Date(`${year}-12-31T23:59:59Z`);

  // カレンダーの開始を最初の日曜日に合わせる
  const current = new Date(startDate);
  while (current.getUTCDay() !== 0) {
    current.setUTCDate(current.getUTCDate() - 1);
  }

  const limitDate = new Date(endDate);
  let safetyCounter = 0;

  while (current <= limitDate && safetyCounter < 400) {
    const dateStr = current.toISOString().split('T')[0];
    const mins = studyData[dateStr] || 0;
    
    days.push({
      date: dateStr,
      minutes: mins,
      level: getStudyLevel(mins)
    });
    
    current.setUTCDate(current.getUTCDate() + 1);
    safetyCounter++;
  }

  return days;
}

/**
 * カレンダー上部に表示するための月ラベルのリストを生成します。
 * 各月が最初に出現する週のインデックスを記録します。
 *
 * @param year - 対象の年
 * @param days - generateCalendarData で生成されたカレンダーデータ
 * @returns 月ごとのラベル情報の配列
 */
export function generateMonthLabels(year: number, days: CalendarDay[]): MonthLabel[] {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const labels: MonthLabel[] = [];
  let currentMonth = -1;

  days.forEach((day, index) => {
    const dateObj = new Date(day.date);
    const month = dateObj.getUTCMonth();
    const dateYear = dateObj.getUTCFullYear();
    const weekIndex = Math.floor(index / 7) + 1;

    // 年が変わらず、月が新しくなった場合にラベルを追加する
    if (dateYear === year && month !== currentMonth) {
      labels.push({ name: monthNames[month], weekIndex });
      currentMonth = month;
    }
  });

  return labels;
}

/**
 * 学習時間（分）を人間に読みやすい「X時間Y分」の形式にフォーマットします。
 *
 * @param minutes - 学習時間 (分)
 * @returns フォーマットされた文字列 (例: "1時間30分" または "45分")
 */
export function formatStudyTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return h > 0 ? `${h}時間${m}分` : `${m}分`;
}
