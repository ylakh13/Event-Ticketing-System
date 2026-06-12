export default function EventCardSkeleton() {

    return (

        <div className="animate-pulse overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">

            <div className="h-48 bg-slate-200" />

            <div className="space-y-4 p-5">

                <div className="h-4 w-24 rounded bg-slate-200" />

                <div className="h-6 w-3/4 rounded bg-slate-200" />

                <div className="space-y-3">

                    <div className="h-4 w-full rounded bg-slate-200" />

                    <div className="h-4 w-5/6 rounded bg-slate-200" />

                    <div className="h-4 w-2/3 rounded bg-slate-200" />

                </div>

                <div className="flex items-center justify-between pt-3">

                    <div className="space-y-2">

                        <div className="h-4 w-20 rounded bg-slate-200" />

                        <div className="h-6 w-28 rounded bg-slate-200" />

                    </div>

                    <div className="h-10 w-28 rounded bg-slate-200" />

                </div>

            </div>

        </div>
    );
}