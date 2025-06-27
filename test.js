import { processLogData } from './app.js';

function runTests() {
  const logText = `
11:00:00,Test Job A, START,123
11:06:00,Test Job A, END,123
11:10:00,Test Job B, START,456
11:25:00,Test Job B, END,456
11:30:00,Test Job C, START,789
11:31:00,Test Job C, END,789
  `.trim();

  const results = processLogData(logText);

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log('✅ PASS:', message);
      passed++;
    } else {
      console.error('❌ FAIL:', message);
      failed++;
    }
  }

  assert(results[0].includes('[WARNING]'), 'Test Job A should be a WARNING (6 min)');
  assert(results[1].includes('[ERROR]'), 'Test Job B should be an ERROR (15 min)');

  // Job C is <5 min → should not appear in output
  assert(!results.some(line => line.includes('Test Job C')), 'Test Job C should not appear in output');

  console.log('\n🧪 Test Summary');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);

  if (failed === 0) {
    console.log('🎉 All tests passed!');
  }
}

runTests();
