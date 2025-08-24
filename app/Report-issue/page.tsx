import { ReportIssueForm } from '@/components/issues-section/ReportIssueForm'
import React from 'react'
import { requireAuth } from '@/lib/utils'

const IssuePage = async () => {
    await requireAuth()

    return (
        <div>
            <ReportIssueForm/>
        </div>
    )
}

export default IssuePage
