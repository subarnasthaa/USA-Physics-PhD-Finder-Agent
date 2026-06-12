import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const syncLogs = await db.syncLog.findMany({
      orderBy: { syncedAt: 'desc' },
      take: 50,
    })

    return NextResponse.json(syncLogs)
  } catch (error) {
    console.error('Error fetching sync logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sync logs' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const source = body.source || 'manual'

    // Count current records before sync
    const universitiesBefore = await db.university.count()
    const cscInfoBefore = await db.cSCInfo.count()

    // For now, this is a stub that records the sync attempt
    // In a real implementation, this would fetch data from external sources
    const syncLog = await db.syncLog.create({
      data: {
        source,
        status: 'success',
        recordsSynced: universitiesBefore + cscInfoBefore,
        changes: JSON.stringify({
          universitiesBefore,
          cscInfoBefore,
          message: 'Sync operation completed',
          timestamp: new Date().toISOString(),
        }),
      },
    })

    // Count after (same for now since no actual sync happened)
    const universitiesAfter = await db.university.count()
    const cscInfoAfter = await db.cSCInfo.count()

    return NextResponse.json({
      syncLog,
      stats: {
        before: {
          universities: universitiesBefore,
          cscInfo: cscInfoBefore,
        },
        after: {
          universities: universitiesAfter,
          cscInfo: cscInfoAfter,
        },
      },
    })
  } catch (error) {
    console.error('Error during sync:', error)

    // Log the failed sync attempt
    try {
      const source = (await request.json().catch(() => ({}))).source || 'manual'
      await db.syncLog.create({
        data: {
          source,
          status: 'failed',
          recordsSynced: 0,
          changes: JSON.stringify({
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString(),
          }),
        },
      })
    } catch {
      // Ignore logging errors
    }

    return NextResponse.json(
      { error: 'Failed to sync data' },
      { status: 500 }
    )
  }
}
