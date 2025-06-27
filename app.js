export function parseTimeToSeconds(timeStr) {
  const [h, m, s] = timeStr.split(':').map(Number);
  return h * 3600 + m * 60 + s;
}

export function processLogData(logText) {
  const lines = logText.trim().split('\n');
  const jobs = {};

  for (const line of lines) {
    const [timeStr, desc, status, pid] = line.split(',').map(s => s.trim());
    const time = parseTimeToSeconds(timeStr);

    if (!jobs[pid]) jobs[pid] = { description: desc };
    if (status === 'START') jobs[pid].start = time;
    else if (status === 'END') jobs[pid].end = time;
  }

  const output = [];
  let completed = 0, over5min = 0, over10min = 0, incomplete = 0;
  let longestDuration = 0;
  let longestJob = null;

  const totalJobs = Object.keys(jobs).length;

  for (const [pid, job] of Object.entries(jobs)) {
    const { start, end, description } = job;

    if (!start || !end) {
      incomplete++;
      continue; // ❌ Exclude from output
    }

    completed++;
    const duration = end - start;

    if (duration > longestDuration) {
      longestDuration = duration;
      longestJob = { pid, description, duration };
    }

    if (duration > 600) {
      over10min++;
      output.push(`[ERROR] Job ${pid} (${description}) took ${duration} seconds (${(duration / 60).toFixed(2)} min).`);
    } else if (duration > 300) {
      over5min++;
      output.push(`[WARNING] Job ${pid} (${description}) took ${duration} seconds (${(duration / 60).toFixed(2)} min).`);
    }
  }

  output.push('\n=== Summary ===');
  output.push(`Total Jobs: ${totalJobs}`);
  output.push(`Completed Jobs: ${completed}`);
  output.push(`Incomplete Jobs: ${incomplete}`);
  output.push(`Jobs > 5 minutes: ${over5min}`);
  output.push(`Jobs > 10 minutes: ${over10min}`);
  if (longestJob) {
    output.push(`Longest Job: ${longestJob.pid} (${longestJob.description}) took ${longestJob.duration} seconds (${(longestJob.duration / 60).toFixed(2)} min)`);
  }

  return output;
}

export function filterLogLines(lines) {
  return lines.filter(line => line.startsWith("[WARNING]") || line.startsWith("[ERROR]"));
}

export function extractTableRows(logLines) {
  const rows = [];

  for (const line of logLines) {
    const rows = [];

    for (const line of logLines) {
      const match = line.match(/^\[(WARNING|ERROR)\] Job (\d+) \((.*?)\) took \d+ seconds \(([\d.]+) min\)/);
      if (match) {
        const [, status, pid, desc, minutes] = match;
        rows.push({
          PID: pid,
          Description: desc,
          "Duration (min)": parseFloat(minutes),
          Status: status
        });
      }
    }

    return rows;
  }
}
