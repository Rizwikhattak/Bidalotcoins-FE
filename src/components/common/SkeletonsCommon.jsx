import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList } from "@/components/ui/tabs";
export function NotificationsSkeleton({ count = 5 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="border border-muted/40 shadow-sm">
          <CardContent className="flex justify-between gap-6 p-6">
            {/* left side: message lines */}
            <div className="flex flex-col gap-2">
              {/* first line (document & action) */}
              <Skeleton className="h-4 w-[60%] sm:w-[40%]" />
              {/* second line (author) */}
              <Skeleton className="h-3 w-40 sm:w-56" />
            </div>

            {/* right side: timestamp */}
            <Skeleton className="h-4 w-32 self-start" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
export function AddUserSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="border border-muted/40 shadow-sm">
          <CardContent className="flex justify-between gap-6 p-6">
            {/* left side: message lines */}
            <div className="flex flex-col gap-2">
              {/* first line (document & action) */}
              <Skeleton className="h-4 w-[60%] sm:w-[40%]" />
              {/* second line (author) */}
              <Skeleton className="h-3 w-40 sm:w-56" />
            </div>

            {/* right side: timestamp */}
            <Skeleton className="h-4 w-32 self-start" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ActivityLogSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-36" />
        <Skeleton className="h-5 w-64" />
      </div>

      {/* Document Info Section */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-32" />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-36" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-36" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>
      </div>

      {/* Activity Log Section */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-28" />

        {/* Activity Log Entries */}
        <div className="space-y-6">
          {/* Activity Entry 1 */}
          <div className="flex gap-4">
            <Skeleton className="h-6 w-6 rounded-full shrink-0" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>

          {/* Activity Entry 2 */}
          <div className="flex gap-4">
            <Skeleton className="h-6 w-6 rounded-full shrink-0" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>

          {/* Activity Entry 3 */}
          <div className="flex gap-4">
            <Skeleton className="h-6 w-6 rounded-full shrink-0" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function EditDocumentSkeleton() {
  return (
    <div className="p-6 space-y-8 bg-slate-50">
      {/* Document Category Section */}
      <div className="space-y-4">
        <Skeleton className="h-7 w-44" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cost Card */}
          <div className="border rounded-lg p-4 bg-white">
            <div className="space-y-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-5 w-36" />
            </div>
          </div>

          {/* Sale Card */}
          <div className="border rounded-lg p-4 bg-white">
            <div className="space-y-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-5 w-36" />
            </div>
          </div>
        </div>
      </div>

      {/* Document ID Section */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Document Owner Section */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-40" />
        <div className="relative">
          <Skeleton className="h-10 w-full rounded-md" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Skeleton className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Date Uploaded Section */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Time Uploaded Section */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}

export function DocumentSummarySkeleton() {
  return (
    <div>
      {/* ── Tabs header ───────────────────────────────────────── */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full rounded-md" />
          ))}
        </TabsList>

        {/* we don’t need separate TabsContent placeholders – one block   */}
        {/* is enough because the real content swaps in once loaded       */}
        <div className="space-y-6">
          {/* ── amount + status badges ─────────────────────────── */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <Skeleton className="h-3 w-20" /> {/* “Amount” label */}
              <Skeleton className="h-8 w-40" /> {/* value */}
            </div>

            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-24 rounded-full" /> {/* status */}
              <Skeleton className="h-5 w-24 rounded-full" />{" "}
              {/* payment status */}
            </div>
          </div>

          {/* ── 4×2 info grid (labels + values) ───────────────── */}
          <div className="grid grid-cols-2 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-32" /> {/* label */}
                <Skeleton className="h-4 w-48" /> {/* value */}
                {/* optional extra line for description */}
                {i === 2 && <Skeleton className="h-3 w-40" />}
              </div>
            ))}
          </div>

          {/* ── Owner / Uploader cards ─────────────────────────── */}
          <div className="grid grid-cols-2 gap-6 pt-2 border-t">
            {["Owner", "Uploader"].map((_, i) => (
              <div key={i} className="space-y-3 pt-4">
                <Skeleton className="h-3 w-32" /> {/* section label */}
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" /> {/* avatar */}
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Table placeholder for “Items” tab ──────────────── */}
          <Card className="border mt-6">
            <div className="p-4 space-y-4">
              {/* table header bar */}
              <Skeleton className="h-4 w-full" />
              {/* 4 mock rows */}
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </Card>

          {/* ── subtotal / totals summary bar ──────────────────── */}
          <div className="mt-6 border rounded-lg p-4 space-y-3 bg-muted/30">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-3 w-24" /> {/* label */}
                <Skeleton className="h-3 w-32" /> {/* number */}
              </div>
            ))}
            <div className="flex justify-between pt-2">
              <Skeleton className="h-4 w-20" /> {/* Total label */}
              <Skeleton className="h-4 w-36" /> {/* Total number */}
            </div>
          </div>
        </div>
      </Tabs>

      {/* ── footer buttons ────────────────────────────────────── */}
      <div className="flex justify-end gap-3 mt-6">
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>
    </div>
  );
}

// Card Skeleton with Stats
export function CardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-24 w-full" />
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-5 w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function DocumentDashboardSkeleton() {
  return (
    <div className="w-full  px-4 flex flex-col min-h-[calc(100vh-50px)]">
      {/* Top Navigation/Filter Tabs */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          {/* Tab items */}
          <div className="flex items-center space-x-1">
            <Skeleton className="h-5 w-20 rounded-md bg-blue-600" />
          </div>
          <div className="flex items-center space-x-1">
            <Skeleton className="h-5 w-20 rounded-md bg-gray-200" />
          </div>
          <div className="flex items-center space-x-1">
            <Skeleton className="h-5 w-28 rounded-md bg-gray-200" />
          </div>
        </div>

        {/* Add New Document Button */}
        <Skeleton className="h-12 w-48 rounded-lg bg-blue-600" />
      </div>

      {/* Kanban Board */}
      <main className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full pb-6">
          {/* Processing Column */}
          <div className="bg-gray-100 rounded-lg p-4">
            {/* Column Header */}
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-7 w-28" />
              <Skeleton className="h-7 w-8 rounded-full" />
            </div>

            {/* Document Cards */}
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div key={item} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-5 w-28 mb-3" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-16 rounded-full" />
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* In Review Column */}
          <div className="bg-gray-100 rounded-lg p-4">
            {/* Column Header */}
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-7 w-28" />
              <Skeleton className="h-7 w-8 rounded-full" />
            </div>

            {/* Empty State */}
            <div className="h-40 flex items-center justify-center">
              <Skeleton className="h-20 w-20 rounded-full opacity-30" />
            </div>
          </div>

          {/* Ready Column */}
          <div className="bg-gray-100 rounded-lg p-4">
            {/* Column Header */}
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-7 w-20" />
              <Skeleton className="h-7 w-8 rounded-full" />
            </div>

            {/* Empty State */}
            <div className="h-40 flex items-center justify-center">
              <Skeleton className="h-20 w-20 rounded-full opacity-30" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export function ActiveSubscriptionSkeleton() {
  return (
    <div className="w-full bg-white border rounded-lg p-6 space-y-4">
      {/* Header with title and status */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-6 w-16 rounded-full bg-green-100" />
      </div>

      {/* Description */}
      <Skeleton className="h-5 w-full" />

      {/* Includes section */}
      <div className="space-y-4 pt-2">
        <Skeleton className="h-5 w-20" />

        {/* List items */}
        <div className="space-y-3 pl-5">
          <div className="flex gap-2">
            <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
            <Skeleton className="h-5 w-full" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
            <Skeleton className="h-5 w-full" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      </div>

      {/* Dates section */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>

      {/* Button */}
      <div className="pt-2">
        <Skeleton className="h-10 w-56 rounded-md" />
      </div>
    </div>
  );
}

// export function ActivityLogSkeleton() {
//   return (
//     <div className="w-full max-w-2xl mx-auto p-6 bg-white">
//       {/* Document Info Section */}
//       <div className="mb-8">
//         <Skeleton className="h-6 w-32 mb-6" />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Left Column */}
//           <div className="space-y-4">
//             <div>
//               <Skeleton className="h-4 w-20 mb-1" />
//               <Skeleton className="h-5 w-32" />
//             </div>

//             <div>
//               <Skeleton className="h-4 w-24 mb-2" />
//               <div className="flex items-center">
//                 <Skeleton className="w-8 h-8 rounded mr-2" />
//                 <Skeleton className="h-5 w-24" />
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-4">
//             <div>
//               <Skeleton className="h-4 w-16 mb-1" />
//               <Skeleton className="h-5 w-20" />
//             </div>

//             <div>
//               <Skeleton className="h-4 w-24 mb-2" />
//               <Skeleton className="h-6 w-16 rounded-full" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Activity Log Section */}
//       <div>
//         <Skeleton className="h-6 w-24 mb-6" />

//         <div className="space-y-6">
//           {/* Activity Items */}
//           {[1, 2, 3, 4, 5].map((item) => (
//             <div key={item} className="flex items-start">
//               <Skeleton className="w-4 h-4 rounded-full mt-1 mr-4 flex-shrink-0" />
//               <div className="flex-1 space-y-1">
//                 <Skeleton className="h-5 w-3/4" />
//                 <Skeleton className="h-4 w-1/3" />
//                 <Skeleton className="h-4 w-1/4" />
//                 {item === 2 && (
//                   <div className="flex space-x-4">
//                     <Skeleton className="h-4 w-20" />
//                     <Skeleton className="h-4 w-20" />
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

export function SubscriptionPlansSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 border rounded-xl shadow-sm bg-white">
      {/* Header Section */}
      <div className="mb-8 space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-5 w-full max-w-2xl" />
        <Skeleton className="h-5 w-64" />
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Plan Card */}
        <div className="p-6 rounded-xl bg-gray-50 ">
          <div className="space-y-6 h-full flex flex-col">
            {/* Plan Title */}
            <Skeleton className="h-7 w-24" />

            {/* Price */}
            <div className="flex items-end gap-2">
              <Skeleton className="h-16 w-32" />
              <Skeleton className="h-6 w-20 mb-2" />
            </div>

            {/* Features */}
            <div className="space-y-4 pt-4 flex-1 flex flex-col justify-end">
              <Skeleton className="h-5 w-24" />
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-5 w-36" />
                </div>
              </div>
            </div>

            {/* Button */}
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>

        {/* Custom Plan Card */}
        <div className="p-6 rounded-xl bg-gray-50">
          <div className="space-y-6">
            {/* Plan Title and Badge */}
            <div className="flex justify-between items-center">
              <Skeleton className="h-7 w-36" />
              <Skeleton className="h-6 w-28 rounded-full bg-blue-100" />
            </div>

            {/* Price */}
            <div className="flex items-end gap-2">
              <Skeleton className="h-16 w-48" />
              <Skeleton className="h-6 w-20 mb-2" />
            </div>

            {/* User Input */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-12 w-full rounded-md" />
            </div>

            {/* Features */}
            <div className="space-y-4">
              <Skeleton className="h-5 w-24" />
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-5 w-36" />
                </div>
              </div>
            </div>

            {/* Button */}
            <Skeleton className="h-10 w-32 rounded-md bg-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AccountantGetSkeleton() {
  return (
    <div className="w-full bg-white max-w-md border rounded-xl p-5 space-y-4">
      {/* Header with avatar, status and menu */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-md bg-gray-200" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>

      {/* Main name/title */}
      <Skeleton className="h-7 w-16 mt-2" />

      {/* Two-column info section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-6 w-40" />
        </div>
      </div>

      {/* Member since section */}
      <div className="space-y-2 pt-1">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
}

export function CategoriesGroupsSkeleton() {
  return (
    <div className="w-full max-w-4xl">
      {/* Header Section */}
      {/* <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-5 w-96" />
        </div>
        <Skeleton className="h-10 w-40 rounded-md bg-blue-600" />
      </div> */}

      {/* Category Cards */}
      <div className="space-y-4 mt-6">
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton key={item} className="h-20 w-full rounded-md bg-gray-100" />
        ))}
      </div>
    </div>
  );
}
export function CategoriesRowSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 w-full">
          <Skeleton className="h-10 w-[200px] rounded-md" />
          <Skeleton className="h-10 w-[200px] rounded-md" />
          <Skeleton className="h-6 w-12 flex-1 rounded-full" />
          <div className="flex-1 flex justify-end">
            <Skeleton className="h-6 w-6 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
export function DocumentCardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm m-3">
      <div className="flex justify-between items-start mb-3">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-5 w-28 mb-3" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-16 rounded-full" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

// Dashboard Stats Skeleton
export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-xl border bg-card p-4 shadow-sm">
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  );
}

// Table Skeleton
export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <div className="bg-muted/50 p-4">
        <div className="flex justify-between">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>
      <div className="divide-y">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="flex items-center p-4 gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
export function BusinessProfileFormSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-32" />
      </div>

      {/* Logo Section */}
      <div className="flex flex-col items-center mb-8">
        <Skeleton className="h-6 w-16 mb-2" />
        <Skeleton className="h-40 w-40 rounded-md bg-red-50" />
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Business Name */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Country of Origin */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Base Currency */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Language */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* State */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Address - Full Width */}
        <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-3">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* City */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Zip Code */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Practice Code */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* CRN */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
    </div>
  );
}

export function ComboboxSkeleton() {
  return (
    <div className="space-y-2 w-full">
      {/* Label */}
      <Skeleton className="h-5 w-16" />

      {/* Combobox input field */}
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}

export function BusinessProfileSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-9 w-32" />
      </div>

      <div className="space-y-8">
        {/* Logo and basic info section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Company logo */}
          <Skeleton className="h-48 w-48 rounded-md bg-red-50" />

          {/* First row of info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6 flex-1">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-7 w-48" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-7 w-20" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-7 w-20" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-7 w-28" />
            </div>
          </div>
        </div>

        {/* Second row of info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-7 w-20" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-7 w-16" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-7 w-36" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-7 w-36" />
          </div>
        </div>

        {/* Address section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
          <div className="space-y-2 md:col-span-1">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-1/2" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-7 w-24" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-7 w-20" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <Skeleton className="h-px w-full mt-8" />
    </div>
  );
}

// Chart Skeleton
export function ChartSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-8 w-1/4" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-[240px] flex items-end gap-2">
          {[...Array(12)].map((_, i) => {
            const height = Math.floor(Math.random() * 100) + 40;
            return (
              <Skeleton
                key={i}
                className={`w-full h-[${height}px] rounded-t-md`}
                style={{ height: `${height}px` }}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-10" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Activity Feed Skeleton
export function ActivitySkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <Skeleton className="h-8 w-1/3 mb-4" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
            <div className="space-y-2 w-full">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Dashboard Layout Skeleton
export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-1/4" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <StatsSkeleton />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartSkeleton />
        </div>
        <div>
          <ActivitySkeleton />
        </div>
      </div>

      <TableSkeleton />
    </div>
  );
}

// Animated Pulse Skeleton
export function PulseSkeleton({ className, ...props }) {
  return <Skeleton className={`animate-pulse ${className}`} {...props} />;
}

// Gradient Skeleton
export function GradientSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm overflow-hidden relative">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-24 w-full" />
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-5 w-1/4" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
    </div>
  );
}

// Sidebar Skeleton
export function SidebarSkeleton() {
  return (
    <div className="w-64 h-screen border-r p-4 flex flex-col gap-6">
      <Skeleton className="h-10 w-32 mx-auto" />
      <div className="space-y-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-4 w-28" />
          </div>
        ))}
      </div>
      <Skeleton className="h-px w-full my-2" />
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-4 w-28" />
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <div className="flex items-center gap-3 p-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
