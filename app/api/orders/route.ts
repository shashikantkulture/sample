import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Server-side validation
    if (!body.customer || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid order payload: Missing items or customer information.' },
        { status: 400 }
      );
    }

    const { fullName, email, address, phone } = body.customer;
    if (!fullName || !email || !address) {
      return NextResponse.json(
        { success: false, error: 'Incomplete customer address or contact details.' },
        { status: 400 }
      );
    }

    // Mock order creation in database / Supabase / PostgreSQL / MongoDB
    const orderId = `LX-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      customer: body.customer,
      items: body.items,
      subtotal: body.subtotal,
      shipping: body.shipping || 0,
      total: body.total,
      paymentMethod: body.paymentMethod || 'card',
      paymentStatus: 'escrow_authorized',
      orderStatus: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Order verified and securely registered with LUXIGNIA private vault.',
      data: newOrder,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Server error processing order.' },
      { status: 500 }
    );
  }
}
